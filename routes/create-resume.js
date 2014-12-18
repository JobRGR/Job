var HttpError = require('../error').HttpError;
var AuthError = require('../models/user').AuthError;

var mongoose = require('../lib/mongoose');
var users = mongoose.model('User');
var async = require('async');

exports.get = function(req, res) {
    res.render('create-resume');
}


exports.post = function(req, res, next) {

    async.waterfall([
        function(callback){
            users.find({username : req.user.username },function(err,res){
                callback(null,res);
            });
        }
    ], function(err, result){
        result[0].firstname = req.body.firstname;
        result[0].save();
        console.log(result[0].firstname);
    });
}



