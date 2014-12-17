var async = require('async');

var OpenQ = require('../models/openQ').OpenQ;
var TestQ = require('../models/testQ').TestQ;

exports.post = function(req, res, next) {
    var id = req.body.id;

    var mongoose = require("../lib/mongoose");
    //console.log(mongoose.model("Post").findByIdAndRemove(id));
    mongoose.model('Post').findById(id, function (err, doc) {
        if (err) throw err;
        doc.remove();

        async.parallel({
            open: function(callback){
                OpenQ.find({
                    'postId': id
                }, function(err, open){
                    for(var i=0;i<open.length;i++)
                        open[i].remove()


                    callback(null, open)
                });
            },
            test: function(callback){
                TestQ.find({
                    'postId': id
                }, function(err, test){
                    for(var i=0;i<test.length;i++)
                        test[i].remove()

                    callback(null, test)
                });
            }
        }, function(err, results){
            if(err) return
        })
    })
}