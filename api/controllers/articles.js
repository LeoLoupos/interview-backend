//Validation package
const Joi = require('joi');


//Controller for GET `/api/articles`
exports.articles_get_all =  async (req, res, next) => {
    //Getting the 'articles_get_all'  functions
    let articlesGetAll = require('../db/articles').articles_get_all;
    let result;

    try {
        //call the function and retrieve result
        result = await articlesGetAll()

    } catch (error) { 
        //let winston wrap the error
        next(new Error(error)); 
    }

    if(result){
        //If result exists , we construct our response
        res.status(200).json({
            count: result.rows.length,
            articles: await result.rows.map(doc => { 
                //for every value of the result's row , we transform our desired result
                return {
                    article_id : doc.article_id,
                    title: doc.title,
                    thumbnail: doc.thumbnail,
                    creator_id: doc.creator_id,
                    createdat: doc.createdat,
                    creator: {
                        name: doc.name,
                        profileUrl: doc.profileurl
                    },
                    request: {
                        type: 'GET',
                        url: `http:localhost:3000/api/articles`
                    }
                }
            })
    });

    }
    
}

//Controller for GET `/api/articles/orderTitle`
exports.articles_get_all_orderedBy_title =  async (req, res, next) => {
    //Getting the 'articles_get_all_orderedBy_title'  functions
    let articlesGetAll_orderBy_title = require('../db/articles').articles_get_all_orderedBy_title;
    let result;

    try {
        //call the function and retrieve result
        result = await articlesGetAll_orderBy_title();

    } catch (error) {
         //let winston wrap the error
         next(new Error(error)); 
    }

    if(result){
        //If result exists , we construct our response
        res.status(200).json({
            count: result.rows.length,
            articles: await result.rows.map(doc => {
                //for every value of the result's row , we transform our desired result 
                return {
                    article_id : doc.article_id,
                    title: doc.title,
                    thumbnail: doc.thumbnail,
                    creator_id: doc.creator_id,
                    createdat: doc.createdat,
                    creator: {
                        name: doc.name,
                        profileUrl: doc.profileurl
                    },
                    request: {
                        type: 'GET',
                        url: `http:localhost:3000/api/articles/orderTitle`
                    }
                }
            })
    });

    }
    
}

//Controller for GET `/api/articles/orderDate`
exports.articles_get_all_orderedBy_date =  async (req, res, next) => {
    //Getting the 'articles_get_all_orderedBy_date'  functions
    let articlesGetAll_orderBy_date = require('../db/articles').articles_get_all_orderedBy_date;
    let result;

    try {
        //call the function and retrieve result
        result = await articlesGetAll_orderBy_date();

    } catch (error) {
         //let winston wrap the error
         next(new Error(error)); 
    }

    if(result){
        //If result exists , we construct our response
        res.status(200).json({
            count: result.rows.length,
            articles: await result.rows.map(doc => { 
                //for every value of the result's row , we transform our desired result
                return {
                    article_id : doc.article_id,
                    title: doc.title,
                    thumbnail: doc.thumbnail,
                    creator_id: doc.creator_id,
                    createdat: doc.createdat,
                    creator: {
                        name: doc.name,
                        profileUrl: doc.profileurl
                    },
                    request: {
                        type: 'GET',
                        url: `http:localhost:3000/api/articles/orderDate`
                    }
                }
            })
    });

    }
    
}

//Controller for GET `/api/articles/searchTitle`
exports.articles_searchBy_title =  async (req, res, next) => {
    //Title has to be a valid string of length > 0
    const title_schema  = Joi.string().min(1).required();

    //Validate search input with Joi Schema.    
    const {error} = Joi.validate(req.query.title, title_schema , { presence: "required" } );

    //If title is valid and error is undefined OR null
    if(error === undefined || error === null) {
        
        //Getting the 'articles_searchBy_title'  functions
        let articlesSearchBy_title = require('../db/articles').articles_searchBy_title;
        let result;

        try {
            //call the function and retrieve result , with the title having the query data
            result = await articlesSearchBy_title(req.query.title);

        } catch (error) {
            //let winston wrap the error
            next(new Error(error)); 
        }

        if(result){
            //If result exists , we construct our response
            res.status(200).json({
                count: result.rows.length,
                articles: await result.rows.map(doc => { 
                    //for every value of the result's row ,we transform our desired result
                    return {
                        article_id : doc.article_id,
                        title: doc.title,
                        thumbnail: doc.thumbnail,
                        creator_id: doc.creator_id,
                        createdat: doc.createdat,
                        creator: {
                            name: doc.name,
                            profileUrl: doc.profileurl
                        },
                        request: {
                            type: 'GET',
                            url: `http:localhost:3000/api/articles/searchTitle`
                        }
                    }
                })
            });

        }
   
    } else { //If input is not a string
        next(new Error('Wrong Input'));
    }
    
}

