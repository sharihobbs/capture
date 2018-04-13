// const express = require('express');
// const multer = require('multer');
// const path = require('path');
// const ejs = require('ejs');

// const storage = multer.diskstorage({
//   destination: './public/uploads/',
//   filename: function(req, file, cb){
//     cb(null,file.fieldnam + '-' + Date.now() +
//     path.extname(file.originalname));
//   }
// });

// const upload = multer({
//   storage: storage
// }).single('myImage');

// const app = express();

// // unsure about the view engine param below
// app.set('view engine', 'ejs');

// app.use(express.static('./public'));

// // not sure I need this since my endpoints are in server.js
// // app.get('/', (req, res) => res.render('index'));

// // catching the post action from the html file
// app.post('/upload', (req, res) => {
//   upload(req, res, (err) => {
//     if(err){
//       res.render('index', {
//         msg: err
//       });
//     } else {
//       console.log(req.file);
//       res.send('test');
//     }
//   });
// });



