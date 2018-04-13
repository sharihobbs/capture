const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');
const mongoose = require('mongoose');
const moment = require('moment');

const expect = chai.expect;

const {Post} = require('../models');
const {app, runServer, closeServer} = require('../server');
const {TEST_DATABASE_URL} = require('../config');

chai.use(chaiHttp);

function seedData() {
  console.info('seeding data');
  const seedData = [];
  for (let i=1; i<=10; i++) {
    seedData.push({
      //id: 100+i,
      image: faker.image.imageUrl(),
      created: moment(new Date(Date.now())).format('MMM Do YY'),
      text: faker.lorem.text()
    });
  }
  return Post.insertMany(seedData);
}

function tearDownDb() {
  return new Promise((resolve, reject) => {
    console.warn('Deleting database');
    mongoose.connection.dropDatabase()
      .then(result => resolve(result))
      .catch(err => reject(err));
  });
}

describe('Posts API resource', function() {
  before(function() {
    return runServer(TEST_DATABASE_URL);
  });
  beforeEach(function() {
    return seedData();
  });
  afterEach(function() {
    return tearDownDb();
  });
  after(function() {
    return closeServer();
  });

  describe('GET endpoint', function() {

    it('should return all posts on GET', function() {
      let res;
      return chai.request(app)
      .get('/')
      .then(function(_res) {
        res = _res;
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

    it('should return JSON object on GET', function() {
      return chai.request(app)
      .get('/api/posts')
      .then(function(res) {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res).to.be.a('object');
        expect(res.body.length).to.be.above(0);
        res.body.forEach(function(item) {
          expect(item).to.be.a('object');
          expect(item).to.include.keys(
            'id', 'image', 'created', 'text');
        });
      });
    });
  });

  describe('POST endpoint', function() {

    it('should add a new gratitude post on POST', function() {
      const newPost = {
      image: faker.image.imageUrl(),
      created: moment(new Date(Date.now())).format('MMM Do YY'),
      text: faker.lorem.text()
      };

      return chai.request(app)
        .post('/posts')
        .send(newPost)
        .then(function(res) {
          expect(res).to.have.status(201);
          expect(res).to.be.json;
          expect(res.body).to.be.a('object');
          expect(res.body).to.include.keys(
            'id', 'image', 'created', 'text');
          expect(res.body.image).to.equal(newPost.image);
          expect(res.body.id).to.not.be.null;
          expect(res.body.created).to.equal(newPost.created);
          expect(res.body.text).to.equal(newPost.text);
          return Post.findById(res.body.id);
        })
        .then(function(post) {
          expect(post.image).to.equal(newPost.image);
          expect(post.created).to.equal(newPost.created);
          expect(post.text).to.equal(newPost.text);
        });
    });
  });

  describe('PUT endpoint', function() {

    it('should update single post on PUT posts id', function() {
      const updateData = {
      image: faker.image.imageUrl(),
      created: moment(new Date(Date.now())).format('MMM Do YY'),
      text: faker.lorem.text()
      };
      return Post
        .findOne()
        .then(function (post) {
          updateData.id = post.id;
          return chai.request(app)
          .put(`/posts/${post.id}`)
          .send(updateData);
        })
        .then(function(res) {
          expect(res).to.have.status(204);
          return Post.findById(updateData.id);
        })
        .then(function (post) {
          expect(post.image).to.equal(updateData.image);
          expect(post.created).to.equal(updateData.created);
          expect(post.text).to.equal(updateData.text);
        });
      });
  });

  describe('DELETE endpoint', function() {

    it('should delete a single post on DELETE posts id', function() {
      let post;
      return Post
        .findOne()
        .then(_post => {
          post = _post;
          return chai.request(app).delete(`/posts/${post.id}`);
      })
      .then(res => {
        expect(res).to.have.status(204);
        return Post.findById(post.id);
      })
      .then(_post => {
        expect(_post).to.not.exist;
      });
    });
  });

})
