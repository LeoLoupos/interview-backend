var redis = require('redis');
var redisClient = redis.createClient({host : 'localhost', port : 6379});

/*

This file holds a middleware function that helps us , cache expired data
in order to avoid workload on the server side.
In other words, if we have already stored the needed data , we dont need to call1 the database again, but
we can retrieve the data from Redis

*/


//Event Handdlers
redisClient.on('connect', function(){
    console.log('Connected to Redis');
});

redisClient.on('ready',function() {
    console.log("Redis is ready");
});

redisClient.on('error',function(err) {
    console.error("Error in Redis : " + err);
});

//This function , is checking if the expired data , if still is existing (in RAM) from previous calls
function checkCachedData(req, res, next){
    //Setting Up a Url-based key
    let key = "__expIress__" + req.originalUrl || req.url;
    
    //retrieve data if it exists
    redisClient.get(key, function(err, reply){
      //If it exists we respond with that data
      if(reply){
        res.send(JSON.parse(reply));
      }else{
        //Otherwise we setting up our response body , while we set an expired data , on the server
        res.sendResponse = res.send;
        res.json = (body) => {
            redisClient.setex(key, 2 * 3600, JSON.stringify(body));
            res.sendResponse(body);
        }
        next();
      }
    });
}

module.exports = {
    checkCachedData
}