var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
// config
var config = require('config-lite')(__dirname);
// session & flash
var session = require('express-session');
var flash = require('connect-flash');
// logger modules
var winston = require('winston');
var expressWinston = require('express-winston');

var index = require('./routes/index');   // index里包含所有路由

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// session config
app.set('trust proxy', 1);
app.use(session(config.session));

// display mysql-config
console.log("mysql服务器：" + JSON.stringify(config.mysql));

// flash config
app.use(flash());
app.use(function(req,res,next){
  res.locals.user = req.session.user;
  // res.locals.project = req.session.project;
  // res.locals.depts = req.session.depts;
  // res.locals.deptInfo = req.session.deptInfo;
  res.locals.error = req.flash('error');
  res.locals.success = req.flash('success');
  res.locals.info = req.flash('info');
  next();
});

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// app.use(logger('dev'));   // 去掉默认日志
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'node_modules/gentelella')));

// 正常请求的日志
app.use(expressWinston.logger({
  transports: [
    // new (winston.transports.Console)({
    //     json: true,
    //     colorize: true
    // }),
    new winston.transports.File({
      filename: 'logs/success.log'
    })
  ]
}));

index(app);   // 路由转移

// 错误请求的日志
app.use(expressWinston.errorLogger({
  transports: [
    // new winston.transports.Console({
    //     json: true,
    //     colorize: true
    // }),
    new winston.transports.File({
      filename: 'logs/error.log'
    })
  ]
}));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
