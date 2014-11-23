var User = require('../models/user').User;
var HttpError = require('../error').HttpError;
var AuthError = require('../models/user').AuthError;

exports.get = function(req, res) {
    res.render('sign-up');
};

exports.post = function(req, res, next) {
    console.log(req.body);

    var username = req.body.username;
    var password = req.body.password;
    var confirm = req.body.confirm;
    var firstname = req.body.firstname;
    var secondname = req.body.secondname;
    var mail = req.body.mail;
    var dob = req.body.dob;
    var city = req.body.city;
    var university = req.body.university;
    var direction = req.body.direction;
    var specialty = req.body.specialty ;
    var course = req.body.course;


    if(confirm!=password){
        var message = "Not correct confitm of password";
        return next(new HttpError(403, message));
    }


    User.registration(req, function (err, user) {
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