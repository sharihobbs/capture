'use strict'

const express = require('express');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const router = express.Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const multer  = require('multer');
const path = require('path');
const moment = require('moment');

const {Post} = require('./models');

// Multer storage
const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './public/uploads/');
  },
  filename: function(req, file, callback) {
    callback(null, Date.now()+file.originalname);
  }
});

const upload = multer({
  storage: storage,
  //limits: {fileSize: 1000000},
  fileFilter: function(req, file, callback) {
    checkFileType(file, callback);
  }
}).single('postImg');

function checkFileType(file, callback) {
  const filetypes = /jpeg|jpg|png|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);
  if(mimetype && extname) {
    return callback(null, true);
  } else {
    callback('Error: Images Only!');
  }
}

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

router.get('/:id', function (req, res) {
  Post
    .findById(req.params.id, function (err, post) {
      if (err) return res.status(500).send('something went wrong trying to find this post.');
      if (!post) return res.status(404).send('no post found.');
      res.status(200).send(post);
    });
});

// POST Endpoints
router.post('/', upload, (req, res) => {
  if (!req.body || !req.body.text || !req.file) {
    const message = `Missing text and/or file in request body`;
    console.error(message);
    return res.status(400).send(message);
  }

  Post.create({
    image: req.file.path,
    created: moment(new Date(Date.now())).format('MMM Do YYYY'),
    text: req.body.text
  })
  .then(res.redirect('/'))
  .catch(err => {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong' });
  });
});

// PATCH Endpoints
router.patch('/:id', jsonParser, (req, res) => {
  if (!req.body.text) {
    const message = `Missing text in request body`;
    console.error(message);
    return res.status(400).send(message);
  }
  console.log(`Updating post\`${req.params.id}\``);
  return Post.findByIdAndUpdate(req.params.id, {
    $set: {
      text: req.body.text
    }
  })
  .then(result => {
    console.log(`result: ${JSON.stringify(result, null, 2)}`)
    return res.status(204).end();
  })
});

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