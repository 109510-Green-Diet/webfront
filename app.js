var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

//------------------------------------------------------
var recipe_query_form = require('./routes/recipe_query_form');
var recipe_query = require('./routes/recipe_query');

var activityAmount_list = require('./routes/activityAmount_list');
var activityAmount_one = require('./routes/activityAmount_one');

var nutrition_list = require('./routes/nutrition_list');
var nutrition_one = require('./routes/nutrition_one');

var blog_list = require('./routes/blog_list');
var blog_one = require('./routes/blog_one');
//------------------------------------------------------

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

//------------------------------------------------------
app.use('/recipe/query/form', recipe_query_form);
app.use('/recipe/query', recipe_query);

app.use('/activityAmount/list', activityAmount_list);
app.use('/activityAmount/one', activityAmount_one);

app.use('/nutrition/list', nutrition_list);
app.use('/nutrition/one', nutrition_one);

app.use('/blog/list', blog_list);
app.use('/blog/one', blog_one);
//------------------------------------------------------

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
