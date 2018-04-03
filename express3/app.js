var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// http://localhost:3000/images/111.png 
// http://localhost:3000/show.html


app.use('/', indexRouter);
app.use('/users', usersRouter);

//  只要是 /select 的路径都会 经过这里
app.all('/users', function (req, res, next) {
  console.log('Accessing the secret section ...');
  next(); // pass control to the next handler
});

//正则表达式 路径
// app.get(/a/, function(req, res) {
//   res.send('your path has a');
// });

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
