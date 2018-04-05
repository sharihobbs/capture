'use strict';

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const postSchema =  mongoose.Schema({
  image: {type: String, required: true},
  created: {type: Date, default: Date.now},
  text: {type: String, required: true}
 });

 // postSchema.virtual('authorString').get(function() {
  // return `${this.author.firstName}
  // ${this.author.lastName}`.trim()});

postSchema.methods.serialize = function() {
  return {
    id: this._id,
    image: this.image,
    created: this.created,
    text: this.text
  };
}

const Post = mongoose.model('Post', postSchema);

module.exports = {Post};

