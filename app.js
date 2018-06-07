var createError = require('http-errors');
var express = require('express');
var path = require('path');
var morgan = require('morgan');
var helmet = require('helmet');
var winston = require('./config/winston');

//Router import
var articlesRouter = require('./api/routes/articles')

//Rate Limit import
var rateLimit = require('./api/middleware/security/ratelimit');

//init express
var app = express();

/* If we have env.variable that we want to hide */
if (process.env.NODE_ENV !== 'production') {
  //we can use dotenv, that load .env files
  require('dotenv').load();
}

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


//Morgan with winston stream
app.use(morgan('combined', { stream: winston.stream }));

//Using util packages , to the middleware cycle
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Every request that arrives, is getting build on the header part
app.use((req, res, next) => {

  /* DEN ONLY */
  res.header('Access-Control-Allow-Origin', '*');// * = allow every origin to has access

  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');//Allow also only these headers
  
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

  //winston loggin 
  winston.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);

  //set the res status
  res.status(err.status || 500);

});

module.exports = app;
