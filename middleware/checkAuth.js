var HttpError = require('../error').HttpError;

module.exports = function(req, res, next) {
    if (!req.session.user && !req.session.company) {
        return res.render('home', { title: 'Express' })

        //return next(new HttpError(401, "Вы не авторизованы"));
    }

    next();
};

module.exports.user = function(req, res, next) {
    if (!req.session.user) {
        return res.render('home', { title: 'Express' })

        //return next(new HttpError(401, "Вы не авторизованы"));
    }

    next();
};

module.exports.company = function(req, res, next) {
    if (!req.session.company) {
        return res.render('home', { title: 'Express' })

        //return next(new HttpError(401, "Вы не авторизованы"));
    }

    next();
};