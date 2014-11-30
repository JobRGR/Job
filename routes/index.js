//var checkAuth = require('../middleware/checkAuth');

module.exports = function(app) {
    app.get('/', require('./frontpage').get);

    app.get('/sign-in', require('./sign-in').get);
    app.post('/sign-in', require('./sign-in').post);

    app.get('/register-company', require('./register-company').get);
    app.post('/register-company', require('./register-company').post);

    app.get('/sign-up', require('./sign-up').get);
    app.post('/sign-up', require('./sign-up').post);

    app.get('/post', require('./post').get);
    app.post('/post', require('./post').post);

    app.get('/feed', require('./feed').get);
    //app.post('/feed', require('./feed').post);

    app.post('/logout', require('./logout').post);

    app.get('/cabinet', require('./cabinet').get);
    app.post('/cabinet', require('./cabinet').post);
    app.post('/cabinet-password', require('./cabinet').password);

    app.get('/cabinet-company', require('./cabinet-company').get);
    app.post('/cabinet-company', require('./cabinet-company').post);
    app.post('/cabinet-company-password', require('./cabinet-company').password);

    app.get('/search-user', require('./search').get);
    app.get('/search-page', require('./search').render);

    app.get('/user-page', require('./page').user);
    app.get('/company-page', require('./page').company);
};