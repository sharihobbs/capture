'use strict'

const express = require('express');
const multer  = require('multer');
const mongoose = require('mongoose');
const path = require('path');
mongoose.Promise = global.Promise;
const router = express.Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

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
  storage: storage
}).single('myImage');

// GET Endpoints
router.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/upload.html');
});

// POST Endpoints
router.post('/', (req, res) => {
  upload(req, res, (err) => {
    if(err){
      return res.end('Error uploading file.');
    }
    res.end('File is uploaded');
  });
});

// Export router for use in server.js
module.exports = {router};
