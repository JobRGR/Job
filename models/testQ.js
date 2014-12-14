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
    variant:{
        type: Array,
        required: true
    },
    postId: {
        type: String,
        required: true
    },
    userRespondId: {
        type: Array,
        required: true
    },
    userRespondAnswer: {
        type: Array,
        required: true
    },
    userCorrect: {
        type: Array,
        required: true
    }
});

schema.statics.create = function(test, postId,cb) {
    var TestQ = this;

    var testQ = new TestQ({
        question : test.question,
        answer : test.answer,
        variant : test.variant,
        postId: postId,
        userRespondId: [null],
        userRespondAnswer: [null],
        userCorrect: [null]
    });

    testQ.save(function(err) {
        if (err) return cb(err);
        cb(null,testQ)
    });
};


exports.TestQ = mongoose.model('TestQ', schema);

function AuthError(message) {
    Error.apply(this, arguments);
    Error.captureStackTrace(this, AuthError);

    this.message = message;
}

util.inherits(AuthError, Error);

AuthError.prototype.name = 'AuthError';

exports.AuthError = AuthError;