var crypto = require('crypto');
var async = require('async');
var util = require('util');
var mongoose = require('../lib/mongoose'),
    Schema = mongoose.Schema;

var schema = new Schema({
    question:{
        type: String,
        required: true
    },
    answer:{
        type: String,
        required: true
    },
    postId :{
        type: String,
        required: true
    }
});

schema.statics.create = function(open,postId,cb) {
    var OpenQ = this;

    var openQ = new OpenQ({
        question : open.question,
        answer : open.answer,
        postId: postId
    });

    openQ.save(function(err) {
        if (err) return cb(err);
        cb(null,openQ)
    });
};


exports.OpenQ = mongoose.model('OpenQ', schema);

function AuthError(message) {
    Error.apply(this, arguments);
    Error.captureStackTrace(this, AuthError);

    this.message = message;
}

util.inherits(AuthError, Error);

AuthError.prototype.name = 'AuthError';

exports.AuthError = AuthError;