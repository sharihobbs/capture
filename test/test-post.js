const chai = require('chai');
const chaiHttp = require('chai-http');

// const {app, runServer, closeServer} = require('../server');
const {app} = require('../server');
const expect = chai.expect;

chai.use(chaiHttp);

describe('Posts', function() {
  // Activate server before tests.
  // before(function() {
  //   return runServer();
  // });

  // // After tests, close server.
  // after(function() {
  //   return closeServer();
  // });

  it('should return 200 status code on GET', function() {
    return chai.request(app)
      .get('/')
      .then(function(res) {
        expect(res).to.have.status(200);
        });
      });
  });
