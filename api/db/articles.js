/*

This file exports 4 functions , these functions are be used to connect and retrieve data from PostGreSQL server
@functions :
 - articles_get_all
 - articles_get_all_orderedBy_title
 - articles_get_all_orderedBy_date
 - articles_searchBy_title
*/


exports.articles_get_all =  async () => {
    //Setting up a postgre client and connection
    var pg = require('pg');        
    var client = new pg.Client(process.env.POSTGRE_DATABASE_URL);
    client.connect();

    //stores the result from all the articles query
    const result = await  client.query('SELECT articles.article_id,articles.title,articles.thumbnail,articles.creator_id,articles.createdat,creators.creator_id,creators.name,creators.profileurl FROM articles INNER JOIN creators ON articles.creator_id = creators.creator_id');
    
    //close postgresql db connection
    await client.end();

    return result;

}

exports.articles_get_all_orderedBy_title =  async () => {
    //Setting up a postgre client and connection
    var pg = require('pg');        
    var client = new pg.Client(process.env.POSTGRE_DATABASE_URL);
    client.connect();

    //stores the result from all the articles query (order By title)
    const result = await client.query('SELECT articles.article_id,articles.title,articles.thumbnail,articles.creator_id,articles.createdat,creators.creator_id,creators.name,creators.profileurl FROM articles INNER JOIN creators ON articles.creator_id = creators.creator_id ORDER BY articles.title');

    //close postgresql db connection
    await client.end();

    return result;

}

exports.articles_get_all_orderedBy_date =  async () => {
    //Setting up a postgre client and connection
    var pg = require('pg');        
    var client = new pg.Client(process.env.POSTGRE_DATABASE_URL);
    client.connect();

    //stores the result from all the articles query (order By date)
    const result = await client.query('SELECT articles.article_id,articles.title,articles.thumbnail,articles.creator_id,articles.createdat,creators.creator_id,creators.name,creators.profileurl FROM articles INNER JOIN creators ON articles.creator_id = creators.creator_id ORDER BY articles.createdat');
        
    //close postgresql db connection
    await client.end();

    return result;
}

exports.articles_searchBy_title =  async (title) => {
    //Setting up a postgre client and connection
    var pg = require('pg');        
    var client = new pg.Client(process.env.POSTGRE_DATABASE_URL);
    client.connect();
    
    //stores the result from all the articles query (LIKE '%pattern%')
    const result = await client.query(`
    SELECT articles.article_id,articles.title,articles.thumbnail,articles.creator_id,articles.createdat,creators.creator_id,creators.name,creators.profileurl FROM articles INNER JOIN creators ON articles.creator_id = creators.creator_id WHERE articles.title LIKE '%${title}%' 
    `);

    //close postgresql db connection
    await client.end();

    return result;
}