var Post = require('../models/post').Post;
var HttpError = require('../error').HttpError;
var AuthError = require('../models/post').AuthError;

var User = require('../models/user').User;

var async = require('async')

exports.get = function(req, res, next){
    var id = req.query.id;
    Post.findById(id, function(err, post){
        //res.json(post)


        User.find({
            username: { $in: post.users}
        }, function(err, users){
            console.log(users);

            res.render('respond-list',{users: users})
            //res.json(users)
        });

//        async.each(post.users,
//            function(userId,callback) {
//                User.find({"_id":userId}, function(err, user){
//                    callback(user);
//                })
//            },
//            function(result){
//                console.log(result)
//            }
//        );
    })
}

exports.post = function(req, res, next) {
    Post.respond(req, function (err, post) {
        res.send({});
    })
};
