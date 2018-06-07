const chai = require("chai");
const expect = chai.expect;
const sinon = require("sinon");

const request = require("supertest");

const app = require('../../app');

/* 
Spies: Creates fake functions which we can use to track executions. This means we can tell/ find out whether the function has been executed/ how many times its been called etc. We can also use spies on existing functions and get the same capability, to track those functions executions. We'll see this in action a bit later.

Stubs: Enables us to replace functions. This gives us more control. We can return whatever we want or have our functions work in a way that suites us to be able to test multiple scenarios.

Mocks: They are fake methods, that have pre-programmed behavior and pre-programmed expectations.
*/

//End-to-End tests for route /api/articles
describe("checkApi_Articles", function() {

    it('it responds with 200 and all the articles in JSON', (done) => {
        
        //First request runs without the Redis caching
        request(app)
        .get('/api/articles')
        .type('json')
        .set('Accept', 'application/json')
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(200)
        .end(function(err, res) {
            if (err) {
              return done(err);
            }
            done();
        });
        
    });

});

describe("checkApi_Articles_OrderTitle", function() {

    it('it responds with 200 and all the articles in JSON', (done) => {
        
        //First request runs without the Redis caching
        request(app)
        .get('/api/articles')
        .type('json')
        .set('Accept', 'application/json')
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(200)
        .end(function(err, res) {
            if (err) {
              return done(err);
            }
            done();
        });
        
    });

    it('it responds with 200 and all the articles in TEXT', (done) => {
        
        //Second request runs with the Redis caching
        request(app)
        .get('/api/articles')
        .type('json')
        .set('Accept', 'application/json')
        .expect('Content-Type', 'text/html; charset=utf-8')
        .expect(200)
        .end(function(err, res) {
            if (err) {
              return done(err);
            }
            done();
        });
        
    });

});