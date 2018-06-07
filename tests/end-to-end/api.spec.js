//Testing libraries
const chai = require("chai");
const expect = chai.expect;
const sinon = require("sinon");

//Winston logging
const winston = require('winston');

//Our express app
const app = require('../../app');

//supertest helps us , to call Http endpoints and test their behavior
const request = require("supertest");

//Setting up our env variables
process.env.POSTGRE_DATABASE_URL = 'postgres://Leo:password@localhost:5432/norbloc-interview';
process.env.PORT = 3000;

//End-to-End test for route /api/articles
describe("checkApi GET `/api/articles `", function() {

    it('it responds with 200 and all the articles in JSON', async () => {
        var result; //our result

        try {
            //First request runs without the Redis caching
            result = await request(app)
            .get('/api/articles')
            .type('json')
            .set('Accept', 'application/json')
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(200)
        
        } catch(e) {
            winston.error(e);
        }

        //Our query is correct , so the result.text should exists
        expect(JSON.parse(result.text)).to.exist;
       
       
    });

});

//End-to-End test for route /api/articles/orderTitle
describe("checkApi GET `/api/articles/orderTitle `", function() {

    it('it responds with 200 and all the articles order by Title in JSON', async () => {
        var result; //our result

        try {
            //First request runs without the Redis caching
            result = await request(app)
            .get('/api/articles/orderTitle')
            .type('json')
            .set('Accept', 'application/json')
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(200)
        
        } catch(e) {
            winston.error(e);
        }
        //Result.text holds the response
        expect(result.text).to.exist;

        //Our query is correct , so the expected length has to be above 0
        expect(JSON.parse(result.text)).to.have.property('articles').to.have.length.above(0);
        expect(JSON.parse(result.text)).to.have.property('count');
       
        
    });

});

//End-to-End test for route /api/articles/orderDate
describe("checkApi GET `/api/articles/orderDate `", function() {

    it('it responds with 200 and all the articles order by Date in JSON', async () => {
        var result; //our result

        try {
            //First request runs without the Redis caching
            result = await request(app)
            .get('/api/articles/orderDate')
            .type('json')
            .set('Accept', 'application/json')
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(200)
        
        } catch(e) {
            winston.error(e);
        }

        //Result.text holds the response
        expect(result.text).to.exist;

        //Our query is correct , so the expected length has to be above 0
        expect(JSON.parse(result.text)).to.have.property('articles').to.have.length.above(0);
        expect(JSON.parse(result.text)).to.have.property('count');
    
       
    });

});

//End-to-End test for route /api/articles/searchTitle
describe("checkApi GET `/api/articles/searchTitle `", function() {

    //Giving
    it('it responds with 200 , title = a, with result returned', async () => {
        
        const test_title = 'a';
        var result; //our result

        try {
            //First request runs without the Redis caching
            result = await request(app)
            .get(`/api/articles/searchTitle?title=${test_title}`)
            .type('json')
            .set('Accept', 'application/json')
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(200)
        
        } catch(e) {
            winston.error(e);
        }

        //Result.text holds the response
        expect(result.text).to.exist;
        //Our query is correct , so the expected length has to be above 0
        expect(JSON.parse(result.text)).to.have.property('articles').to.have.length.above(0);
        expect(JSON.parse(result.text)).to.have.property('count');

    });


    it('it responds with 200, title = $3$#@!@# , with no result returned', async () => {
        
        const test_title = '$3$#@!@#';
        var result; //our result

        try {
            //First request runs without the Redis caching
            result = await request(app)
            .get(`/api/articles/searchTitle?title=${test_title}`)
            .type('json')
            .set('Accept', 'application/json')
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(200)
        
        } catch(e) {
            winston.error(e);
        }


        //Result.text holds the response
        expect(result.text).to.exist;

        //Our query is wrong , so the expected length has to be below 1
        //Our count is 0
        expect(JSON.parse(result.text)).to.have.property('articles').to.have.length.below(1);
        expect(JSON.parse(result.text)).to.have.property('count')

    });

});