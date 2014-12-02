var Post = require('../models/post').Post;

var HttpError = require('../error').HttpError;
var AuthError = require('../models/user').AuthError;

exports.get = function(req, res) {
    var id = req.query.id;

    Post.findById(id,function(err, post) {
        res.render('post-edit',{post: post});
    });
};

exports.post = function(req, res, next) {
    Post.edit(req, function (err, post) {
        if (err) {
            if(err instanceof AuthError){
                return next(new HttpError(403, err.message));
            } else {
                return next(err);
            }
        }
        res.send({post: post});
    })
}



