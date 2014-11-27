var Company = require('../models/company').Company;
var HttpError = require('../error').HttpError;
var AuthError = require('../models/company').AuthError;

exports.get = function(req, res) {
    res.render('register-company');
};

exports.post = function(req, res, next) {
    var username = req.body.username;
    var password = req.body.password;

    Company.registration(req, function (err, company) {
        if (err) {
            if(err instanceof AuthError){
                return next(new HttpError(403, err.message));
            } else {
                return next(err);
            }
        }

        req.session.company = company._id;
        res.send({});
    })
}