var User = require('../models/user').User;
var Company = require('../models/company').Company;

var HttpError = require('../error').HttpError;
var AuthError = require('../models/user').AuthError;

exports.user = function(req, res) {
    var id = req.query.id;

    User.findById(id,function(err, user) {
        res.render('user-page',{curuser: user});
    });
};
exports.company = function(req, res) {
    var id = req.query.id;

    Company.findById(id,function(err, company) {
        res.render('company-page',{curcompany: company});
    });
};
