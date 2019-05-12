var createError = require('http-errors');
var express = require('express');
var session = require('express-session');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var passport = require('passport');
var app = express();
var flash = require('connect-flash');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// express-session settings
app.use(
    session({
      secret: 'secret',
      resave: true,
      saveUninitialized: true
    })
);

// flash messages
app.use(flash());

app.use(function(req, res, next) {
    res.locals.success_msg = req.flash('success');
    res.locals.warning_msg = req.flash('warning');
    res.locals.error = req.flash('error');
    next();
});


// initialization middleware for passport local strategy
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

// routes' directory handling
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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