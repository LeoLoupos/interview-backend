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

// router.post('/', checkAuth, 
//                  bodyValidation.validateOrder,
//                  OrdersController.orders_create_order );

// router.get('/:orderid', checkAuth, 
//                         redisCache.checkCachedData,
//                         OrdersController.orders_get_orderid );

// router.patch('/:orderid', checkAuth, 
//                           bodyValidation.validateOrder,
//                           OrdersController.orders_patch_order );

// router.delete('/:orderid', checkAuth, 
//                            OrdersController.orders_delete_order );

module.exports = router;