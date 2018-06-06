var RateLimit = require('express-rate-limit');
var RedisStore = require('rate-limit-redis');

//Prevent Brute Forcing with Rate Limiting
try{
    var limiter = new RateLimit({
        store: new RedisStore({
            expiry: 60,
            prefix: 'app_main_server',
            client: require('redis').createClient()
        }),
        max: 100, // limit each IP to 100 requests per windowMs
        delayMs: 0 // disable delaying - full speed until the max limit is reached
    });
} catch (e) {
    console.error(e);
}

 
module.exports = {
    limiter
}