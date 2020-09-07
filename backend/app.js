var createError = require('http-errors');
var express = require('express');
var cors = require('cors')
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var searchRouter = require('./routes/search');

var app = express();

var corsOptions = {
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));


if (app.get('env') === 'development') {
  require('dotenv').config();
}

// create connection to database
require('./loaders/db')

app.use('/search', cors(corsOptions), searchRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

if (app.get('env') === 'production') {
  app.use(express.static('public/build'));
  console.log("Inside prod")
  app.get('*', (req, res) => {
      console.log('Here');
      res.sendFile(path.resolve(__dirname, 'public', 'build', 'index.html'));
  });
}

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