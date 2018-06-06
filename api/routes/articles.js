const express = require('express');
const router =  express.Router();

//controller
const ArticlesController = require('../controllers/articles');


//Get all articles joined with the creators
router.get('/', ArticlesController.articles_get_all );

//Get all articles order by Title and joined with the creators
router.get('/orderTitle', ArticlesController.articles_get_all_orderedBy_title );

//Get all articles order by Date and joined with the creators
router.get('/orderDate', ArticlesController.articles_get_all_orderedBy_date );

//Get all articles that match , the title we are seeking
router.get('/searchTitle', ArticlesController.articles_searchBy_title );

module.exports = router;