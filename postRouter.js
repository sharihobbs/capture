'use strict'

const express = require('express');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const router = express.Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const _ = require('lodash')

const {Post} = require('./models');

// GET Endpoints
router.get('/', (req, res) => {
  Post
    .find()
    .then(posts => {
      res.json(posts.map(post => post.serialize()));
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'something is not right' });
    });
});

// POST Endpoints
router.post('/', jsonParser, (req, res) => {
  const requiredFields = ['image', 'created', 'text'];
  Object.keys(req.body).forEach(field => {
    if (!_.includes(requiredFields, field)) {
      const message = `Missing \`${field}\` in request body`;
      console.error(message);
      return res.status(400).send(message);
    }
  })
  Post.create({
    image: req.body.image,
    created: req.body.created,
    text: req.body.text
  })
  .then(post => res.status(201).json(post.serialize()))
  .catch(err => {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong' });
  });
});

// PUT Endpoints
router.put('/:id', jsonParser, (req, res) => {
  const requiredFields = ['id', 'image', 'created', 'text'];
  for (let i=0; i<requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req. body)) {
      const message = `Missing \`${field}\` in request body`
      console.error(message);
      return res.status(400).send(message);
    }
  }
  if (req.params.id !== req.body.id) {
    const message = (
      `Request path id (${req.params.id}) and request body id`
      `(${req.body.id}) must match`);
    console.error(message);
    return res.status(400).send(message);
  }
  console.log(`Updating shopping list item \`${req.params.id}\``);
  return Post.update({
    id: req.params.id,
    image: req.body.image,
    created: req.body.created,
    text: req.body.text
  })
  .then(result => {
    console.log(`result: ${JSON.stringify(result, null, 2)}`)
    return res.status(204).end();
  })
});

// router.put('/:id', jsonParser, (req, res) => {
//   if (!(req.params.id && req.body.id && req.params.id === req.body.id)) {
//     res.status(400).json({
//       error: 'Request path id and request body id values must match'
//     });
//   }
//   const updated = {};
//   const updateableFields = ['image', 'created', 'text'];
//   updateableFields.forEach(field => {
//     if (field in req.body) {
//       updated[field] = req.body[field];
//     }
//   });
//   Post
//   .findByIdAndUpdate(req.params.id, { $set: updated }, { new: true })
//   .then(updatedPost => res.status(204).end())
//   .catch(err => res.status(500).json({ message: 'Something went wrong' }));
// });

// DELETE Endpoints
router.delete('/:id', (req, res) => {
  Post
    .findByIdAndRemove(req.params.id)
    .then(() => {
      res.status(204).json({ message: 'Success' });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Something went wrong' });
    });
});

// Export router for use in server.js
module.exports = {router};
