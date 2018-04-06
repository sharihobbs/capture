'use strict';

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const gratPostSchema =  mongoose.Schema({
  image: {type: String, required: true},
  created: {type: Date, default: Date.now},
  text: {type: String, required: true}
 });

 // postSchema.virtual('authorString').get(function() {
  // return `${this.author.firstName}
  // ${this.author.lastName}`.trim()});

gratPostSchema.methods.serialize = function() {
  return {
    id: this._id,
    image: this.image,
    created: this.created,
    text: this.text
  };
}

const GratPost = mongoose.model('GratPost', gratPostSchema);

module.exports = {GratPost};

