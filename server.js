'use strict'

const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const {DATABASE_URL, PORT} = require('./config');
const app = express();

const {router: postRouter} = require('./postRouter');
const {router: userRouter} = require('./users/userRouter');
const {router: uploadRouter} = require('./uploadRouter');

app.use(express.static('public'));
app.use('/public/uploads', express.static('public/uploads'));
app.use(morgan('common'));

app.use('/posts', postRouter);
app.use('/user', userRouter);
app.use('/upload', uploadRouter);


// Endpoint for home page - show all posts
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});


const multer  = require('multer')

const {Post} = require('./models');

// const storage = multer.diskStorage({
//   destination: function (req, file, callback) {
//     callback(null, './public/uploads/');
//   },
//   filename: function(req, file, callback) {
//     callback(null, Date.now()+file.originalname);
//   }
// });

// const upload = multer({
//   storage: storage
// }).single('myImage');

// app.get('/', (req, res) => {
//   res.sendFile(__dirname + '/public/index.html');
// });

// app.get('/user', (req, res) => {
//   res.sendFile(__dirname + '/public/sign-in.html');
// });

// app.get('/upload', (req, res) => {
//   res.sendFile(__dirname + '/public/upload.html');
// });

// app.post('/upload', (req, res) => {
//   upload(req, res, (err) => {
//     if(err){
//       return res.end('Error uploading file.');
//     }
//     res.end('File is uploaded');
//   });
// });

// app.get('/api/posts', (req, res) => {
//   Post
//     .find()
//     .then(posts => {
//       res.json(posts.map(post => post.serialize()));
//     })
//     .catch(err => {
//       console.error(err);
//       res.status(500).json({ error: 'something is not right' });
//     });
// });

// app.post('/posts', (req, res) => {
//   const requiredFields = ['image', 'created', 'text'];
//   for (let i=0; i < requiredFields.length; i++) {
//     const field = requiredFields[i];
//     if (!(field in req.body)) {
//       const message = `Missing \`${field}\` in request body`;
//       console.error(message);
//       return res.status(400).send(message);
//     }
//   }
//   Post
//     .create({
//       image: req.body.image,
//       created: req.body.created,
//       text: req.body.text
//     })
//     .then(post => res.status(201).json(post.serialize()))
//     .catch(err => {
//       console.error(err);
//       res.status(500).json({ error: 'Something went wrong' });
//     });
// });

// app.put('/posts/:id', (req, res) => {
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


// app.delete('/posts/:id', (req, res) => {
//   Post
//     .findByIdAndRemove(req.params.id)
//     .then(() => {
//       res.status(204).json({ message: 'Success' });
//     })
//     .catch(err => {
//       console.error(err);
//       res.status(500).json({ error: 'Something went wrong' });
//     });
// });


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
