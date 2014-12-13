var Post = require('../models/post').Post;
var HttpError = require('../error').HttpError;
var AuthError = require('../models/post').AuthError;

exports.get = function(req, res) {
    res.render('post');
};

exports.post = function(req, res, next) {
    Post.create(req, function (err, post) {
       if (err) console.log(err);
       res.send();
    })
};