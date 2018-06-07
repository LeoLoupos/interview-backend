const express = require('express');
const router =  express.Router();

//controller
const ArticlesController = require('../controllers/articles');

//Redis Routes Caching
const redisCache = require('../middleware/redis_router_caching');

/*

This file holds the Express Router for our `/articles` path
The controller , handles how/what the response will be 

*/

//Get all articles joined with the creators
router.get('/', redisCache.checkCachedData,
                ArticlesController.articles_get_all );

//Get all articles order by Title and joined with the creators
router.get('/orderTitle', redisCache.checkCachedData,
                          ArticlesController.articles_get_all_orderedBy_title );

//Get all articles order by Date and joined with the creators
router.get('/orderDate',  redisCache.checkCachedData,
                          ArticlesController.articles_get_all_orderedBy_date );

//Get all articles that match , the title we are seeking
//@param{ String } title
router.get('/searchTitle', ArticlesController.articles_searchBy_title );

module.exports = router;