//Controller for GET `/api/articles`
exports.articles_get_all =  async (req, res, next) => {
    //Getting the 'articles_get_all'  functions
    var articlesGetAll = require('../db/articles').articles_get_all;

    try {
        //call the function and retrieve result
        var result = await articlesGetAll()

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
    var articlesGetAll_orderBy_title = require('../db/articles').articles_get_all_orderedBy_title;

    try {
        //call the function and retrieve result
        var result = await articlesGetAll_orderBy_title();

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
    var articlesGetAll_orderBy_date = require('../db/articles').articles_get_all_orderedBy_date;

    try {
        //call the function and retrieve result
        var result = await articlesGetAll_orderBy_date();

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

//Help function to validate title
function validInputTitle(title){
    const validTitle = typeof title == 'string';

    return validTitle;
}

//Controller for GET `/api/articles/searchTitle`
exports.articles_searchBy_title =  async (req, res, next) => {

    //If input is a string
    if(validInputTitle(req.query.title)){
        //Getting the 'articles_searchBy_title'  functions
        var articlesSearchBy_title = require('../db/articles').articles_searchBy_title;

        try {
            //call the function and retrieve result , with the title having the query data
            var result = await articlesSearchBy_title(req.query.title);

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
        next(new Error(error));
    }
    
}

