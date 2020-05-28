var express = require('express');
var path = require('path');
//var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');

var recipe_query_form = require('./routes/recipe_query_form');
var recipe_query = require('./routes/recipe_query');

var activityAmount_list = require('./routes/activityAmount_list');
var activityAmount_one = require('./routes/activityAmount_one');

var nutrition_list = require('./routes/nutrition_list');
var nutrition_one = require('./routes/nutrition_one');

var blog_list = require('./routes/blog_list');
var blog_one = require('./routes/blog_one');

var about_us_list = require('./routes/about_us_list');

var user_login_form = require('./routes/user_login_form');


var app = express();

//---------------------------------------------
// 使用passport-google-oauth2套件進行認證
//---------------------------------------------
var passport = require('passport');

app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

//載入google oauth2
var GoogleStrategy = require('passport-google-oauth20').Strategy;

//填入自己在google cloud platform建立的憑證
passport.use(
    new GoogleStrategy({
        clientID: '570465346201-a83umm8c6srh19ffl778f02akuors09o.apps.googleusercontent.com', 
        clientSecret: 'zFwwWPcvJWqqwQdoF6NK_mz8',
        callbackURL: "https://eat10556ntub.herokuapp.com"
    },
    function(accessToken, refreshToken, profile, done) {
        if (profile) {
            return done(null, profile);
        }else {
            return done(null, false);
        }
    }
));
//---------------------------------------------

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

//---------------------------------------------
// 設定登入及登出方法內容
//---------------------------------------------
app.get('/user/login',
    passport.authenticate('google', { scope: ['email', 'profile'] }));   //進行google第三方認證

app.get('/auth/google/callback', 
    passport.authenticate('google', { failureRedirect: '/login' }),   //導向登入失敗頁面	
    function(req, res) {
        // 如果登入成功, 使用者資料已存在session
        console.log(req.session.passport.user.id);
        console.log(req.session.passport.user.displayName);
        console.log(req.session.passport.user.emails[0].value);	    
        
        res.redirect('/user/login/state');   //導向登入成功頁面
    });

app.get('/user/logout', function(req, res){    
    req.logout();        //將使用者資料從session移除
    res.redirect('/');   //導向登出頁面
});    
//---------------------------------------------
app.use('/recipe/query/form', recipe_query_form);
app.use('/recipe/query', recipe_query);

app.use('/activityAmount/list', activityAmount_list);
app.use('/activityAmount/one', activityAmount_one);

app.use('/nutrition/list', nutrition_list);
app.use('/nutrition/one', nutrition_one);

app.use('/blog/list', blog_list);
app.use('/blog/one', blog_one);

app.use('/about/us/list', about_us_list);

app.use('/user/login/form', user_login_form);

var session = require('express-session');
app.use(session({secret: '請更改成一個隨機字串用來加密產生的signedCookie', cookie: { maxAge: 60000 }}));

//--------------------------------------------- 

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