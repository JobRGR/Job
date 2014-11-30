var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var log = require('./lib/log')(module);
var bodyParser = require('body-parser');
var config = require('./config');

var http = require('http');
var HttpError = require('./error').HttpError;

var app = express();

var exphbs  = require('express-handlebars');
var hbs = exphbs.create({//хелперы для хендлбара (добавляет или и не равно и т.д.)
    helpers: {
        ifCond: function (v1, operator, v2, options) {

            switch (operator) {
                case '==':
                    return (v1 == v2) ? options.fn(this) : options.inverse(this);
                case '===':
                    return (v1 === v2) ? options.fn(this) : options.inverse(this);
                case '<':
                    return (v1 < v2) ? options.fn(this) : options.inverse(this);
                case '<=':
                    return (v1 <= v2) ? options.fn(this) : options.inverse(this);
                case '>':
                    return (v1 > v2) ? options.fn(this) : options.inverse(this);
                case '>=':
                    return (v1 >= v2) ? options.fn(this) : options.inverse(this);
                case '&&':
                    return (v1 && v2) ? options.fn(this) : options.inverse(this);
                case '||':
                    return (v1 || v2) ? options.fn(this) : options.inverse(this);
                default:
                    return options.inverse(this);
            }
        },
        list: function(items,options) {
            var out = '';
            for (var i = items.length-1; i>=0; i--) {
                out += options.fn(items[i].postAuthor + " write "+ items[i].title);
            }

            return out;
        }
    }
});
hbs.defaultLayout = 'main';


app.set('port', config.get('port'));

var server = http.createServer(app);
server.listen(config.get('port'), function(){
    log.info('Express server listening on port ' + config.get('port'));
});
console.log('Express server listening on port ' + app.get('port'));

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));

if(app.get('env') == 'development'){
    app.use(logger('dev'));
} else {
    app.use(logger('default'));
}

//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

app.use(cookieParser());

app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

app.use(require('./middleware/sendHttpError'));

app.use(cookieParser());

var store = require('./lib/sessionStore')

var session    = require('express-session');
var MongoStore = require('connect-mongo')(session);
var mongoose = require("mongoose");

app.use(session({
    secret: config.get('session:secret'),
    key: config.get('session:key'),
    cookie: config.get('session:cookie'),
    store: store
}));


app.use(require('./middleware/loadUser'));
app.use(require('./middleware/loadCompany'));

var routes = require('./routes')(app);

// view engine setup

app.engine('handlebars', hbs.engine );
app.set('view engine', 'handlebars');

var io = require('./socket')(server);
app.set('io', io);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
