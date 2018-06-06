//Setting up a postgre client and connection
var pg = require('pg');        
var client = new pg.Client(process.env.POSTGRE_DATABASE_URL);
client.connect();
/*

This file exports 4 functions , these functions are be used to connect and retrieve data from PostGreSQL server
@functions :
 - articles_get_all
 - articles_get_all_orderedBy_title
 - articles_get_all_orderedBy_date
 - articles_searchBy_title
*/


exports.articles_get_all =  async () => {

    //returns all the articles inside the promise
    return client.query('SELECT articles.article_id,articles.title,articles.thumbnail,articles.creator_id,articles.createdat,creators.creator_id,creators.name,creators.profileurl FROM articles INNER JOIN creators ON articles.creator_id = creators.creator_id');
}

exports.articles_get_all_orderedBy_title =  async () => {

    //returns all the articles inside the promise order by title
    return client.query('SELECT articles.article_id,articles.title,articles.thumbnail,articles.creator_id,articles.createdat,creators.creator_id,creators.name,creators.profileurl FROM articles INNER JOIN creators ON articles.creator_id = creators.creator_id ORDER BY articles.title');
}

exports.articles_get_all_orderedBy_date =  async () => {

    //returns all the articles inside the promise order by date
    return client.query('SELECT articles.article_id,articles.title,articles.thumbnail,articles.creator_id,articles.createdat,creators.creator_id,creators.name,creators.profileurl FROM articles INNER JOIN creators ON articles.creator_id = creators.creator_id ORDER BY articles.createdat');
}

exports.articles_searchBy_title =  async (title) => {

    //returns all the articles inside the promise , with LIKE operator 
    return client.query(`
    SELECT articles.article_id,articles.title,articles.thumbnail,articles.creator_id,articles.createdat,creators.creator_id,creators.name,creators.profileurl FROM articles INNER JOIN creators ON articles.creator_id = creators.creator_id WHERE articles.title LIKE '%${title}%' 
    `);
}