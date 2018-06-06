var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var helmet = require('helmet');

var articlesRouter = require('./api/routes/articles')


var app = express();

//Helmet Protection
app.use(helmet.noCache());
app.use(helmet({
    frameguard: {
      action: 'deny' //allow if our app is <frame> || <object>
    }
}));

//Rate Limiter with Redis and express-rate-limit
//Prevents Bruteforces from the same IP
app.use(rateLimit.limiter);


//Using our packages , to the middleware cycle
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//Every request that arrives, is getting build to the header;
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');// * = allow every origin to has access.otherwise -->
  // res.header('Access-Control-Allow-Origin', 'https://my-rest-api.com/api');//To only allow a specific path

  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');//Allow these headers
  
  //When browser posts or puts , sends first an OPTIONS request to check if he is allowed
  if ( req.method === 'OPTIONS' ){
      res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
      return res.status(200).json({}); //empty json body to provide the headers answer
  }

  //let the cycle , continue
  next();
});

//Our only Route
app.use('/api/articles', articlesRouter);


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
