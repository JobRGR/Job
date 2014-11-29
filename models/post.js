var crypto = require('crypto');
var async = require('async');
var util = require('util');
var mongoose = require('../lib/mongoose'),
    Schema = mongoose.Schema;

var company = require('./company');

var schema = new Schema({
    postAuthor: {
        type: String,
        unique: true,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    text:{
        type: String,
        required: true
    },
    place:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now,
        required: false }

});

schema.statics.create = function(req,cb) {
    var Post = this;
    var post = new Post({
        title : req.body.title,
        text : req.body.text,
        place : req.body.place,
        date : req.body.date,
        postAuthor : req.body.id
    });
    post.save(function(err) {
        if (err) return cb(err);
        cb(null,post)
    });
};

//schema.statics.edit =  function(req, callback) {
//    var username = req.body.lastname;
//
//    var companyName = req.body.companyName;
//    var password = req.body.password;
//    var about = req.body.about;
//    var city = req.body.city;
//    var contacts = req.body.contacts;
//    var img = req.body.img;
//
//    var Company = this;
//
//    async.waterfall([
//        function(callback) {
//            Company.findOne({companyName: companyName}, callback);
//        },
//        function(company, callback) {
//            if (company) {
//                console.log(company);
//
//                company.companyName = companyName;
//                company.contacts = contacts;
//                company.about = about;
//                company.city = city;
//                company.img = img;
//
//                company.save(function(err) {
//                    if (err) return callback(err);
//                    callback(null, company);
//                });
//            } else {
//                callback(new AuthError("Wrong Data"));
//            }
//        }
//    ], callback);
//};

//проверяем если есть такая компания
//возвращаем да если есть
//нет если нет

exports.Post = mongoose.model('Post', schema);


function AuthError(message) {
    Error.apply(this, arguments);
    Error.captureStackTrace(this, AuthError);

    this.message = message;
}

util.inherits(AuthError, Error);

AuthError.prototype.name = 'AuthError';

exports.AuthError = AuthError;