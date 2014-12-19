var HttpError = require('../error').HttpError;
var AuthError = require('../models/user').AuthError;

var mongoose = require('../lib/mongoose');
var users = mongoose.model('User');
var async = require('async');

exports.get = function(req, res) {
    res.render('create-resume');
}


exports.post = function(req, res, next) {

    async.waterfall([
        function(callback){
            users.find({username : req.user.username },function(err,res){
                callback(null,res);
            });
        }
    ], function(err, result){
        result[0].firstname = req.body.firstname;
        result[0].secondname = req.body.secondname;

        result[0].mail = req.body.mail;
        result[0].website = req.body.website;
        result[0].mobile = req.body.mobile;
        result[0].personal_info = req.body.personal_info;

        result[0].work_experience.JobTitle = req.body.work_experience.JobTitle;
        result[0].work_experience.Company = req.body.work_experience.Company;
        result[0].work_experience.workingTime.start = req.body.work_experience.workingTime.start;
        result[0].work_experience.workingTime.end = req.body.work_experience.workingTime.end;
        result[0].work_experience.description = req.body.work_experience.description;

        var skills_str = '';
        for (var i = 0; i < req.body.skills.length; i++)
            skills_str += req.body.skills[i] + ', ';

        skills_str = skills_str.substring(0, skills_str.length - 2);
        result[0].skills = skills_str;

        result[0].university = req.body.university;
        result[0].specialty = req.body.specialty;
        result[0].university_desc = req.body.university_desc;

        result[0].save();
        users.find({username : req.user.username },function(err,res){
            console.log(res);
        });
    });
}



