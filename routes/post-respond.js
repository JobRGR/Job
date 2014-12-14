var Post = require('../models/post').Post;

var OpenQ = require('../models/openQ').OpenQ;
var TestQ = require('../models/testQ').TestQ;

var HttpError = require('../error').HttpError;
var AuthError = require('../models/post').AuthError;

var User = require('../models/user').User;

var async = require('async')

exports.get = function(req, res, next){
    var id = req.query.id;
    Post.findById(id, function(err, post){
        //res.json(post)


        User.find({
            '_id': { $in: post.users}
        }, function(err, users){
            //console.log(users);

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

function getIndex(arr, val){
    for(var i=0; i < arr.length;i++)
        if(arr[i]==val) return i

    return undefined
}

exports.post = function(req, res, next) {
    var openObj = req.body.open,
        testObj = req.body.test;

    var openArray = openObj.map(function(val){
        return val.id
    })

    var testArray = testObj.map(function(val){
        return val.id
    })

    async.parallel({
        open: function(calback){
            OpenQ.find({
                '_id': { $in: openArray}
            }, function(err, open){
                for(var i=0;i<open.length;i++){
                    var index = getIndex(openArray, open[i].id)

                    if(index == undefined) continue

                    open[i].userRespondId.push(req.user.id)
                    open[i].userRespondAnswer.push(openObj[index].ans)
                    open[i].userCorrect.push(openObj[index].ans==open[i].answer)

                    open[i].save(function(err) {
                        if (err) console.log(i+" Open")
                    });
                }

                calback(null, open)
            });
        },
        test: function(calback){
            TestQ.find({
                '_id': { $in: testArray}
            }, function(err, test){
                for(var i=0;i<test.length;i++){
                    var index = getIndex(testArray, test[i].id)

                    if(index == undefined) continue

                    test[i].userRespondId.push(req.user.id)
                    test[i].userRespondAnswer.push(testObj[index].ans)
                    test[i].userCorrect.push(testObj[index].ans==test[i].answer)

                    test[i].save(function(err) {
                        if (err) console.log(i+" Test")
                    });
                }

                calback(null, test)
            });
        }
    }, function(err, results){
        if(err) return

        Post.respond(req, function (err, post) {
            res.send({});
        })
    })


};
