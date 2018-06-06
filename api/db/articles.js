exports.articles_get_all =  async () => {
    //Setting up a postgre client and connection
    var pg = require('pg');        
    var client = new pg.Client(process.env.POSTGRE_DATABASE_URL);
    client.connect();

    //returns all the articles inside the promise
    return client.query('SELECT articles.article_id,articles.title,articles.thumbnail,articles.creator_id,articles.createdat,creators.creator_id,creators.name,creators.profileurl FROM articles INNER JOIN creators ON articles.creator_id = creators.creator_id');
}

exports.articles_get_all_orderedBy_title =  async () => {
    //Setting up a postgre client and connection
    var pg = require('pg');        
    var client = new pg.Client(process.env.POSTGRE_DATABASE_URL);
    client.connect();

    //returns all the articles inside the promise
    return client.query('SELECT articles.article_id,articles.title,articles.thumbnail,articles.creator_id,articles.createdat,creators.creator_id,creators.name,creators.profileurl FROM articles INNER JOIN creators ON articles.creator_id = creators.creator_id ORDER BY articles.title');
}

exports.articles_get_all_orderedBy_date =  async () => {
    //Setting up a postgre client and connection
    var pg = require('pg');        
    var client = new pg.Client(process.env.POSTGRE_DATABASE_URL);
    client.connect();

    //returns all the articles inside the promise
    return client.query('SELECT articles.article_id,articles.title,articles.thumbnail,articles.creator_id,articles.createdat,creators.creator_id,creators.name,creators.profileurl FROM articles INNER JOIN creators ON articles.creator_id = creators.creator_id ORDER BY articles.createdat');
}

exports.articles_searchBy_title =  async (title) => {
    //Setting up a postgre client and connection
    var pg = require('pg');        
    var client = new pg.Client(process.env.POSTGRE_DATABASE_URL);
    client.connect();

    //returns all the articles inside the promise
    return client.query('SELECT articles.article_id,articles.title,articles.thumbnail,articles.creator_id,articles.createdat,creators.creator_id,creators.name,creators.profileurl FROM articles INNER JOIN creators ON articles.creator_id = creators.creator_id WHERE articles.title=' + title);
}