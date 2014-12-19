var User = require('../models/user').User;
var Company = require('../models/company').Company;

var Post = require('../models/post').Post;
var OpenQ = require('../models/openQ').OpenQ;
var TestQ = require('../models/testQ').TestQ;

var async = require('async')

var HttpError = require('../error').HttpError;
var AuthError = require('../models/user').AuthError;

function getIndex(arr, val){
    for(var i=0; i < arr.length;i++)
        if(arr[i]==val) return i

    return undefined
}

exports.get = function(req, res) {
    var userId = req.query.UId,
        postId = req.query.PId;

    if(!userId || !postId){
        res.render('home', { title: 'Express' });
        return
    }

    async.parallel({
        user: function(callback){
            User.findById(userId, function(err, user){
                return callback(null, user)
            })
        },
        post: function(callback){
            Post.findById(postId, function(err, post){
                return callback(null, post)
            })
        },
        open: function(callback){
            OpenQ.find({'postId':postId},function(err, open){
                return callback(null, open)
            })
        },
        test: function(callback){
            TestQ.find({'postId':postId},function(err, test){
                return callback(null, test)
            })
        }
    }, function(err, results){

        var user = results.user,
            test = results.test,
            open = results.open;

        var status = 0;

        var ansTest = [],
            ansOpen = []


        if(test)
            for(var i=0;i<test.length;i++) {
                var index = getIndex(test[i].userRespondId, user.id);

                if (index == undefined) continue

                status += test[i].userCorrect[index]

                ansTest.push({
                    test: test[i],
                    index: index
                })
            }

        if(open)
            for(var i=0;i<open.length;i++) {
                var index = getIndex(open[i].userRespondId, user.id);

                if (index == undefined) continue

                status += open[i].userCorrect[index]

                ansOpen.push({
                    test: test[i],
                    index: index
                })
            }

        user['status'] = status


        res.render('respond-page',{curuser: user, test: ansTest, open: ansOpen, status: status});
    })

};