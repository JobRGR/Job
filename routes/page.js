var User = require('../models/user').User;
var Company = require('../models/company').Company;
var Post = require('../models/post').Post;

var HttpError = require('../error').HttpError;
var AuthError = require('../models/user').AuthError;


var async = require('async')

exports.user = function(req, res) {
    var id = req.query.id;

    User.findById(id,function(err, user) {
        res.render('user-page',{curuser: user});
    });
};

exports.post = function(req, res) {
    var id = req.query.id;

    Post.findById(id,function(err, post) {
        res.render('post-details',{post: post, user: req.user});
    });
};

exports.company = function(req, res) {
    var id = req.query.id;


    async.parallel({
            post: function(callback){
                Post.find({postAuthor: id}, callback)
            },
            company: function(callback){
                Company.findById(id,callback)
            }
        }, function(err, result){
            res.render('company-page',{curcompany: result.company, post: result.post, user: req.user});
    });
};
