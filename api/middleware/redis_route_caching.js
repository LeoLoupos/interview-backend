var redis = require('redis');
var redisClient = redis.createClient({host : 'localhost', port : 6379});

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

//This function , is checking if the expired data , is still exists (RAM) from previous calls
function checkCachedData(req, res, next){
    //Setting Up a Url-based key
    let key = "__expIress__" + req.originalUrl || req.url;
    
    //retrieve data if it exists
    redisClient.get(key, function(err, reply){
      if(reply){
        res.send(JSON.parse(reply));
      }else{
        res.sendResponse = res.send;
        res.send = (body) => {
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