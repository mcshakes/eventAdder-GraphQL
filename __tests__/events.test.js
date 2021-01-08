const { assert } = require("chai");
const chai = require("chai");
const sinon = require('sinon');

const expect = chai.expect;
const url = "http://localhost:8080";
const request = require('supertest')(url);

describe('with Stub: query Events', () => {

    before(() => {
        sinon.stub(request, "get")
    })
    let eventsQuery = `query {
        events {
          _id
          description
        }
      }`
    
    it("should return an array of events", (done) => {
        request.post("/graphql")
        .send({query: eventsQuery})
        .expect(200)
        .end((err, res) => {
            if (err) return done(err)

            console.log(res.body.data.events)
            // res.body.events.should
            done();
        })
    })
});