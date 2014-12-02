var HttpError = require('../error').HttpError;

module.exports = function(req, res, next) {
    if (!req.session.user && !req.session.company) {
        return res.render('home', { title: 'Express' })

        //return next(new HttpError(401, "Вы не авторизованы"));
    }

    next();
};