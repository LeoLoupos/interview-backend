const winston = require('winston');

/*

This file exports 4 functions , these functions are be used to connect and retrieve data from PostGreSQL server
@functions :
 - articles_get_all
 - articles_get_all_orderedBy_title
 - articles_get_all_orderedBy_date
 - articles_searchBy_title

 NOTE: Because these functions are not a middleware , we can not do : next(new Error(err)) , so we need winston 
*/

/* Tables:
    -articles
    -creators
*/
const articles_table = `articles`
const creators_table = `creators`

exports.articles_get_all =  async () => {
    //Setting up a postgre client and connection
    const pg = require('pg');        
    const client = new pg.Client(process.env.POSTGRE_DATABASE_URL);
    client.connect();

    //Our result variable
    let result;

    try {
        //stores the result from all the articles query
        result = await client.query(`
        SELECT 
        ${articles_table}.article_id,
        ${articles_table}.title,
        ${articles_table}.thumbnail,
        ${articles_table}.creator_id,
        ${articles_table}.createdat,
        ${creators_table}.creator_id,
        ${creators_table}.name,
        ${creators_table}.profileurl 
        FROM ${articles_table} INNER JOIN ${creators_table} ON ${articles_table}.creator_id = ${creators_table}.creator_id`);
         
        //close postgresql db connection
        await client.end();
    } catch (error) { 
        winston.error('GET /api/articles - ' + error)
    }
    
    //return the result
    return result;

}

exports.articles_get_all_orderedBy_title =  async () => {
    //Setting up a postgre client and connection
    const pg = require('pg');        
    const client = new pg.Client(process.env.POSTGRE_DATABASE_URL);
    client.connect();

    //Our result variable
    let result;

    try {
         //stores the result from all the articles query (order By title)
        result = await client.query(`
         SELECT
        ${articles_table}.article_id,
        ${articles_table}.title,
        ${articles_table}.thumbnail,
        ${articles_table}.creator_id,
        ${articles_table}.createdat,
        ${creators_table}.creator_id,
        ${creators_table}.name,
        ${creators_table}.profileurl 
        FROM ${articles_table} INNER JOIN ${creators_table} ON ${articles_table}.creator_id = ${creators_table}.creator_id 
            ORDER BY ${articles_table}.title`);
            
        //close postgresql db connection
        await client.end();
    } catch (error) { 
        winston.error('GET /api/articles/orderTitle - ' + error)
    }
   
    return result;

}

exports.articles_get_all_orderedBy_date =  async () => {
    //Setting up a postgre client and connection
    const pg = require('pg');        
    const client = new pg.Client(process.env.POSTGRE_DATABASE_URL);
    client.connect();

    //Our result variable
    let result;

    try {
        //stores the result from all the articles query (order By date)
        result = await client.query(`
        SELECT
        ${articles_table}.article_id,
        ${articles_table}.title,
        ${articles_table}.thumbnail,
        ${articles_table}.creator_id,
        ${articles_table}.createdat,
        ${creators_table}.creator_id,
        ${creators_table}.name,
        ${creators_table}.profileurl 
        FROM ${articles_table} INNER JOIN ${creators_table} ON ${articles_table}.creator_id = ${creators_table}.creator_id 
            ORDER BY articles.createdat`);
           
        //close postgresql db connection
        await client.end();
    } catch (error) { 
        winston.error('GET /api/articles/orderDate - ' + error)
    }

    return result;
}

exports.articles_searchBy_title =  async (title) => {
    //Setting up a postgre client and connection
    const pg = require('pg');        
    const client = new pg.Client(process.env.POSTGRE_DATABASE_URL);
    client.connect();
    
    //Our result variable
    let result;

    try {
        //stores the result from all the articles query (LIKE '%pattern%')
        //Parametrized Query 
        result = await client.query(`
        SELECT 
        ${articles_table}.article_id,
        ${articles_table}.title,
        ${articles_table}.thumbnail,
        ${articles_table}.creator_id,
        ${articles_table}.createdat,
        ${creators_table}.creator_id,
        ${creators_table}.name,
        ${creators_table}.profileurl 
        FROM ${articles_table} INNER JOIN ${creators_table} ON ${articles_table}.creator_id = ${creators_table}.creator_id
        WHERE ${articles_table}.title LIKE $1 ORDER BY ${articles_table}.title
        `,[`%${title}%`]);

        //close postgresql db connection
        await client.end();
    } catch (error) { 
        winston.error('GET /api/articles/searchTitle - ' + error)
    }

    return result;
}