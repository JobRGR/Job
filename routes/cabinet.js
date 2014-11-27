var User = require('../models/user').User;
var HttpError = require('../error').HttpError;
var AuthError = require('../models/user').AuthError;

exports.get = function(req, res) {
    res.render('cabinet');
};

exports.post = function(req, res, next) {
    //console.log(req.body);

    var arr = req.body.arr.split("&");
    for(var i=0;i<arr.length;i++){
        var tmp = arr[i].split("=");
        req.body[tmp[0]] = tmp[1]
    }

    //console.log(req.body);


    User.edit(req, function (err, user) {
        if (err) {
            if(err instanceof AuthError){
                return next(new HttpError(403, err.message));
            } else {
                return next(err);
            }
        }

        req.session.user = user._id;
        res.send({});
    })
}

exports.password =  function(req, res, next){

    var username = req.body.username,
        password = req.body.password;

    User.password(username, password, function (err, user) {
        if (err) {
            if(err instanceof AuthError){
                return next(new HttpError(403, err.message));
            } else {
                return next(err);
            }
        }

        req.session.user = user._id;
        res.send({});
    })
}
