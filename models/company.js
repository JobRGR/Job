var crypto = require('crypto');
var async = require('async');
var util = require('util');
var fs = require('fs');
var mongoose = require('../lib/mongoose'),
    Schema = mongoose.Schema;

var schema = new Schema({
    companyName: {
        type: String,
        unique: true,
        required: true
    },
    hashedPassword: {
        type: String,
        required: true
    },
    salt: {
        type: String,
        required: true
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

schema.statics.authorize = function(companyName, password, callback) {
    var Company = this;

    async.waterfall([
        function(callback) {
            Company.findOne({companyName: username}, callback);
        },
        function(company, callback) {
            if (company) {
                if (company.checkPassword(password)) {
                    callback(null, company);
                } else {
                    callback(new AuthError("Wrong Password"));
                }
            } else {
                callback(new AuthError("Wrong name"));
            }
        }
    ], callback);
};

//schema.statics.password = function(username, password, callback) {
//    var User = this;
//
//    async.waterfall([
//        function(callback) {
//            User.findOne({username: username}, callback);
//        },
//        function(user, callback) {
//            if (user) {
//                user.hashedPassword = user.encryptPassword(password);
//
//                user.save(function(err) {
//                    if (err) return callback(err);
//                    callback(null, user);
//                });
//            } else {
//                callback(new AuthError("Wrong Username"));
//            }
//        }
//    ], callback);
//};

//schema.statics.edit =  function(req, callback) {
//    var username = req.body.lastname;
//
//    var newusername = req.body.username;
//    var password = req.body.password;
//    var firstname = req.body.firstname;
//    var secondname = req.body.secondname;
//    var mail = req.body.mail;
//    var dob = req.body.dob;
//    var city = req.body.city;
//    var university = req.body.university;
//    var direction = req.body.direction;
//    var specialty = req.body.specialty ;
//    var course = req.body.course;
//    var img = req.body.img;
//
//    var User = this;
//
//    async.waterfall([
//        function(callback) {
//            User.findOne({username: username}, callback);
//        },
//        function(user, callback) {
//            if (user) {
//
//                user.username = newusername;
//                user.firstname = firstname;
//                user.secondname = secondname;
//                user.mail = mail;
//                user.dob = dob;
//                user.university = university;
//                user.direction = direction;
//                user.specialty = specialty;
//                user.course =  course;
//                user.city = city;
//                user.img = img;
//
//                user.save(function(err) {
//                    if (err) return callback(err);
//                    callback(null, user);
//                });
//            } else {
//                callback(new AuthError("Wrong Data"));
//            }
//        }
//    ], callback);
//};

schema.statics.registration = function(req, callback) {
    var companyName = req.body.username;
    var password = req.body.password;

    var Company = this;

    async.waterfall([
        function(callback) {
            Company.findOne({companyName: companyName}, callback);
        },
        function(company, callback) {
            if (company) {
                callback(new AuthError("Name is already used"));
            } else {

                var company = new Company({
                    companyName: companyName,
                    password: password
                });

                company.save(function(err) {
                    if (err) return callback(err);
                    callback(null, company);
                });
            }
        }
    ], callback);
};

exports.Company = mongoose.model('Company', schema);


function AuthError(message) {
    Error.apply(this, arguments);
    Error.captureStackTrace(this, AuthError);

    this.message = message;
}

util.inherits(AuthError, Error);

AuthError.prototype.name = 'AuthError';

exports.AuthError = AuthError;