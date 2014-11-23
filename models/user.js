var crypto = require('crypto');
var async = require('async');
var util = require('util');
var mongoose = require('../lib/mongoose'),
    Schema = mongoose.Schema;

var schema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    firstname:{
        type: String,
        required: true
    },
    secondname:{
        type: String,
        required: true
    },
    mail:{
        type: String,
        required: true
    },
    dob:{
        type: String,
        required: true
    },
    city:{
        type: String,
        required: true
    },
    university:{
        type: String,
        required: true
    },
    direction:{
        type: String,
        required: true
    },
    specialty:{
        type: String,
        required: true
    },
    course:{
        type: String,
        required: true
    },
    hashedPassword: {
        type: String,
        required: true
    },
    salt: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    }
});

schema.methods.encryptPassword = function(password) {
    return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
};

schema.virtual('password')
    .set(function(password) {
        this._plainPassword = password;
        this.salt = Math.random() + '';
        this.hashedPassword = this.encryptPassword(password);
    })
    .get(function() { return this._plainPassword; });


schema.methods.checkPassword = function(password) {
    return this.encryptPassword(password) === this.hashedPassword;
};

schema.statics.authorize = function(username, password, callback) {
    var User = this;

    async.waterfall([
        function(callback) {
            User.findOne({username: username}, callback);
        },
        function(user, callback) {
            if (user) {
                if (user.checkPassword(password)) {
                    callback(null, user);
                } else {
                    callback(new AuthError("Wrong Password"));
                }
            } else {
                callback(new AuthError("Wrong Username"));
            }
        }
    ], callback);
};

schema.statics.registration = function(req, callback) {
    var username = req.body.username;
    var password = req.body.password;
    var firstname = req.body.firstname;
    var secondname = req.body.secondname;
    var mail = req.body.mail;
    var dob = req.body.dob;
    var city = req.body.city;
    var university = req.body.university;
    var direction = req.body.direction;
    var specialty = req.body.specialty ;
    var course = req.body.course;

    var User = this;

    async.waterfall([
        function(callback) {
            User.findOne({username: username}, callback);
        },
        function(user, callback) {
            if (user) {
                callback(new AuthError("Name is already used"));
            } else {
                var user = new User({
                    username: username,
                    password: password,
                    firstname: firstname,
                    secondname: secondname,
                    mail: mail,
                    dob: dob,
                    university: university,
                    direction: direction,
                    specialty: specialty,
                    course: course,
                    city: city
                });
                user.save(function(err) {
                    if (err) return callback(err);
                    callback(null, user);
                });
            }
        }
    ], callback);
};

exports.User = mongoose.model('User', schema);


function AuthError(message) {
    Error.apply(this, arguments);
    Error.captureStackTrace(this, AuthError);

    this.message = message;
}

util.inherits(AuthError, Error);

AuthError.prototype.name = 'AuthError';

exports.AuthError = AuthError;