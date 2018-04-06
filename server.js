'use strict'

const bodyParser = require('body-parser');
const express = require('express');
const morgan = require('morgan');

// const { DATABASE_URL, PORT } = require('/config');
// const { GratPost } = require('./models');

const app = express();

app.use(express.static('public'));
app.use(morgan('common'));
app.use(bodyParser.json());


// app.use('*', function (req, res) {
//   res.status(404).json({ message: 'Not Found' });
// });

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/sign-in.html');
});

app.get('/posts', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/posts/:id', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/user', (req, res) => {
  res.sendFile(__dirname + '/public/sign-in.html');
});

app.post('/posts/:id', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.post('/user', (req, res) => {
  res.sendFile(__dirname + '/public/sign-in.html');
});

app.put('/posts/:id', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.delete('/posts/:id', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.delete('/user', (req, res) => {
  res.sendFile(__dirname + '/public/sign-in.html');
});

// app.get('/posts', (req, res) => {
//   GratPost
//     .find()
//     .then(posts => {
//       res.json(posts.map(post => post.serialize()));
//     })
//     .catch(err => {
//       console.error(err);
//       res.status(500).json({ error: 'something is not right' });
//     });
// });

// app.get('/posts/:id', (req, res) => {
//   GratPost
//     .findById(req.params.id)
//     .then(post => res.json(post.serialize()))
//     .catch(err => {
//       console.error(err);
//       res.status(500).json({ error: 'something is wacky' });
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
//   GratPost
//     .create({
//       image: req.body.image,
//       created: req.body.created,
//       text: req.body.text
//     })
//     .then(gratPost => res.status(201).json(gratPost.serialize()))
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

//   GratPost
//   .findByIdAndUpdate(req.params.id, { $set: updated }, { new: true })
//   .then(updatedPost => res.status(204).end())
//   .catch(err => res.status(500).json({ message: 'Something went wrong' }));
// });

// app.delete('/posts/:id', (req, res) => {
//   GratPost
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

function runServer() {
  const port = process.env.PORT || 8080;
  return new Promise((resolve, reject) => {
    server = app.listen(port, () => {
      console.log(`Your app is listening on port ${port}`);
      resolve(server);
    }).on('error', err => {
      reject(err)
    });
  });
}

function closeServer() {
  return new Promise((resolve, reject) => {
    console.log('Closing server');
    server.close(err => {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    });
  });
}

if (require.main === module) {
  runServer().catch(err => console.error(err));
}

module.exports = {app, runServer, closeServer};
