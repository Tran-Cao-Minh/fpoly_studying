var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());

// static resources
app.use(express.static(path.join(__dirname, 'public')));

// set up session
const session = require('express-session');
app.use(session({
  secret: 'minhtcps18817',
  resave: true,
  saveUninitialized: true,
  cookie: {
    maxAge: 60000,
  },
}))

// declare and use router
const indexRouter = require('./routes/index');
app.use('/', indexRouter);
const userRouter = require('./routes/user');
app.use('/user', userRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;