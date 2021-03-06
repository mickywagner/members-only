require('dotenv').config()

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose')
var cors = require('cors')

var passport = require('passport')
var session = require('express-session')
var flash = require('express-flash')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var messageRouter = require('./routes/message')


var app = express();

app.use(cors())
// Connect database

const mongoDB = process.env.DB_URL
mongoose.connect(mongoDB, {useNewUrlParser: true})
const db = mongoose.connection
db.on('error', console.error.bind(console, 'mongo connection error'))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(session( { secret: process.env.SECRET_KEY}))
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/message', messageRouter)

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
