var appRoot = require('app-root-path');
var winston = require('winston');

//Our winston transports refer to the storage/output mechanisms used for the logs
//Winstons transports : console , file , HTTP

/*
Winston uses npm logging levels that are prioritized from 0 to 5 (highest to lowest):

0: error
1: warn
2: info
3: verbose
4: debug
5: silly

*/

// define the custom settings for each transport (file, console)
var options = {
    file: {
      level: 'info',
      filename: `${appRoot}/logs/app.log`,
      handleExceptions: true,
      json: true,
      maxsize: 5242880, // 5MB
      maxFiles: 5,
      colorize: false,
    },
    console: {
      level: 'debug',
      handleExceptions: true,
      json: false,
      colorize: true,
    },
};

// instantiate a new Winston Logger with the settings defined above
var logger = new winston.Logger({
  transports: [
    new winston.transports.File(options.file),
    new winston.transports.Console(options.console)
  ],
  exitOnError: false, // do not exit on handled exceptions
});  


// Merging morgan generated output to the winston logging
//we create a stream object with a 'write' function that will be used by `morgan`
logger.stream = {
    write: function(message, encoding) {
      //we use the 'info' log level so the output will be picked up by both transports (file and console)
      logger.info(message);
    },
};

module.exports = logger;
