exports.articles_get_all =  async (req, res, next) => {
    //Getting the 'articles_get_all'  functions
    var articlesGetAll = require('../db/articles').articles_get_all;

    try {
        //call the function and retrieve result
        var result = await articlesGetAll()

    } catch (error) {
        //for developement only . we could easily next(new Error())
        res.status(500).json({
                error: error
        });    
    }

    if(result){
        res.status(200).json({
        count: result.rows.length,
        articles: await result.rows.map(doc => { 
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

exports.articles_get_all_orderedBy_title =  async (req, res, next) => {
    //Getting the 'articles_get_all'  functions
    var articlesGetAll_orderBy_title = require('../db/articles').articles_get_all_orderedBy_title;

    try {
        //call the function and retrieve result
        var result = await articlesGetAll_orderBy_title();

    } catch (error) {
        //for developement only . we could easily next(new Error())
        res.status(500).json({
                error: error
        });    
    }

    if(result){
        res.status(200).json({
        count: result.rows.length,
        articles: await result.rows.map(doc => { 
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

exports.articles_get_all_orderedBy_date =  async (req, res, next) => {
    //Getting the 'articles_get_all'  functions
    var articlesGetAll_orderBy_date = require('../db/articles').articles_get_all_orderedBy_date;

    try {
        //call the function and retrieve result
        var result = await articlesGetAll_orderBy_date();

    } catch (error) {
        //for developement only . we could easily next(new Error())
        res.status(500).json({
                error: error
        });    
    }

    if(result){
        res.status(200).json({
        count: result.rows.length,
        articles: await result.rows.map(doc => { 
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

exports.articles_searchBy_title =  async (req, res, next) => {
    //Getting the 'articles_get_all'  functions
    var articlesSearchBy_title = require('../db/articles').articles_searchBy_title;

    try {
        //call the function and retrieve result , with the title having the query data
        var result = await articlesSearchBy_title(req.query.title);

    } catch (error) {
        //for developement only . we could easily next(new Error())
        res.status(500).json({
                error: error
        });    
    }

    if(result){
        res.status(200).json({
            count: result.rows.length,
            articles: await result.rows.map(doc => { 
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
