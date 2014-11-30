var Post = require('../models/post').Post;



exports.get = function(req, res) {
    var mongoose = require('../lib/mongoose');
    var posts = mongoose.model('Post');

    var async = require('async');

    async.waterfall([
        function(callback){
            posts.find({},function(err,res){
                callback(null,res);
            });
        }
    ], function(err, result){
        res.render('feed',{post:result});
    });


};
