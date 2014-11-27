//var checkAuth = require('../middleware/checkAuth');

module.exports = function(app) {
    app.get('/', require('./frontpage').get);

    app.get('/sign-in', require('./sign-in').get);
    app.post('/sign-in', require('./sign-in').post);

    app.get('/register-company', require('./register-company').get);
    app.post('/register-company', require('./register-company').post);

    app.get('/sign-up', require('./sign-up').get);
    app.post('/sign-up', require('./sign-up').post);

    app.post('/logout', require('./logout').post);

    app.get('/cabinet', require('./cabinet').get);
    app.post('/cabinet', require('./cabinet').post);
    app.post('/cabinet-password', require('./cabinet').password);
};