const chai = require('chai');
const chaiHttp = require('chai-http');

// const {app, runServer, closeServer} = require('../server');
const {app} = require('../server');
const expect = chai.expect;

chai.use(chaiHttp);



describe('Testing Endpoints', function() {
  // // Activate server before tests.
  // before(function() {
  //   return runServer();
  // });

  // // After tests, close server.
  // after(function() {
  //   return closeServer();
  // });

  it('should return 200 status code on GET index', function() {
    return chai.request(app)
    .get('/')
    .then(function(res) {
      expect(res).to.have.status(200);
      });
    });

  it('should return 200 status code on GET posts', function() {
    return chai.request(app)
    .get('/posts')
    .then(function(res) {
      expect(res).to.have.status(200);
      });
    });

  it('should return 200 status code on GET posts id', function() {
    return chai.request(app)
    .get('/posts/:id')
    .then(function(res) {
      expect(res).to.have.status(200);
      });
    });

  it('should return 200 status code on GET user', function() {
    return chai.request(app)
    .get('/user')
    .then(function(res) {
      expect(res).to.have.status(200);
      });
    });

  it('should return 200 status code on POST posts id', function() {
    return chai.request(app)
    .post('/posts/:id')
    .then(function(res) {
      expect(res).to.have.status(200);
      });
    });

  it('should return 200 status code on POST user', function() {
    return chai.request(app)
    .post('/user')
    .then(function(res) {
      expect(res).to.have.status(200);
      });
    });

  it('should return 200 status code on POST photo uploads', function() {
    return chai.request(app)
    .post('/photo/uploads')
    .then(function(res) {
      expect(res).to.have.status(200);
      });
    });

  it('should return 200 status code on PUT posts id', function() {
    return chai.request(app)
    .put('/posts/:id')
    .then(function(res) {
      expect(res).to.have.status(200);
      });
    });

  it('should return 200 status code on DELETE posts id', function() {
    return chai.request(app)
    .delete('/posts/:id')
    .then(function(res) {
      expect(res).to.have.status(200);
      });
    });

  it('should return 200 status code on DELETE user', function() {
    return chai.request(app)
    .delete('/user')
    .then(function(res) {
      expect(res).to.have.status(200);
      });
    });
});

//   it('should return 200 status code on GET posts id', function() {
//     return chai.request(app)
//     .get('/posts/:id')
//     .then(function(res) {
//       expect(res).to.have.status(200);
//       });
//     });
//   });


// describe('POST Endpoint', function() {

//   it('should return 200 status code on POST posts', function() {
//     return chai.request(app)
//     .post('/posts')
//     .then(function(res) {
//       expect(res).to.have.status(200);
//       });
//     });
//   });


// describe('PUT Endpoint', function() {

//   it('should return 200 status code on PUT posts id', function() {
//     return chai.request(app)
//     .put('/posts/:id')
//     .then(function(res) {
//       expect(res).to.have.status(200);
//       });
//     });
//   });


// describe('DELETE Endpoint', function() {

//   it('should return 200 status code on DELETE posts id', function() {
//     return chai.request(app)
//     .delete('/posts/:id')
//     .then(function(res) {
//       expect(res).to.have.status(200);
//       });
//     });
//   });









