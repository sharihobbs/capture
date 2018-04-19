'use strict'

require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const passport = require('passport');


const {DATABASE_URL, PORT} = require('./config');
const app = express();

const {router: postRouter} = require('./postRouter');
const {router: usersRouter} = require('./users');
const {router: authRouter} = require('./auth');
const {localStrategy, jwtStrategy} = require('./auth/strategies');


app.use(express.static('public'));
app.use(morgan('common'));

app.use('/posts', postRouter);
app.use('/api/users', usersRouter);
app.use('/api/auth', authRouter);

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE');
  if (req.method === 'OPTIONS') {
    return res.send(204);
  }
  next();
});

passport.use(localStrategy);
passport.use(jwtStrategy);

const jwtAuth = passport.authenticate('jwt', { session: false });

// A protected endpoint which needs a valid JWT to access it
// // app.get('/api/protected', jwtAuth, (req, res) => {
//   return res.json({
//     data: 'rosebud'
//   });
// });

// Endpoint for home page - show all posts
app.get('/', jwtAuth, (req, res) => {
  res.sendFile(__dirname + '/public/home.html');
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/login.html');
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
