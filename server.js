'use strict'

const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const {DATABASE_URL, PORT} = require('./config');
const app = express();

const {router: postRouter} = require('./postRouter');
// const {router: userRouter} = require('./users/userRouter');
// const {router: authRouter} = require('./auth/authRouter');

app.use(express.static('public'));
app.use(morgan('common'));

app.use('/posts', postRouter);
// app.use('/user', userRouter);
// app.use('/auth', authRouter);

// Endpoint for home page - show all posts
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/home.html');
});

app.get('/public/uploads/:filename', (req, res) => {
  res.sendFile(__dirname + `/public/uploads/${req.params.filename}`);
});

// **********************
// Server functions below...
let server;

function runServer(databaseUrl, port=PORT) {
  return new Promise((resolve, reject) => {
    mongoose.connect(databaseUrl, err => {
      if (err) {
        return reject(err);
      }

    server = app.listen(port, () => {
      console.log(`Your app is listening on port ${port}`);
      resolve(server);
    })
    .on('error', err => {
      mongoose.disconnect();
      reject(err)
      });
    });
  });
}

function closeServer() {
  return mongoose.disconnect().then(() => {
    return new Promise((resolve, reject) => {
      console.log('Closing server');
      server.close(err => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  });
}


if (require.main === module) {
  runServer(DATABASE_URL).catch(err => console.error(err));
}

module.exports = {app, runServer, closeServer};
