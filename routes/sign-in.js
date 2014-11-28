var User = require('../models/user').User;
var Company = require('../models/company').Company;

var async = require('async')

var HttpError = require('../error').HttpError;
var AuthError = require('../models/user').AuthError;

exports.get = function(req, res) {
    res.render('sign-in');
};

exports.post = function(req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    //console.log(req.body);

    var check = req.body.check;

    /*async.parallel([
            function(callback){
                User.authorize(username, password, function (err, user){
                    callback(err,user)
                })
            },
            function(callback){
                Company.authorize(username, password, function(err, company){
                    callback(err,company)
                })
            }
        ],
        function(err, results) {
            console.log(results)
        });*/

    if(check == undefined) {
        User.authorize(username, password, function (err, user) {
            if (err) {
                if (err instanceof AuthError) {
                    return next(new HttpError(403, err.message));
                } else {
                    return next(err);
                }
            }

            req.session.user = user._id;
            res.send({});
        })
    } else {
        Company.authorize(username, password, function (err, company) {
            if (err) {
                if (err instanceof AuthError) {
                    return next(new HttpError(403, err.message));
                } else {
                    return next(err);
                }
            }

            req.session.company = company._id;
            res.send({});
        })
    }
}