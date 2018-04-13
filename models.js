'use strict';

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const moment = require('moment');


const gratPostSchema =  mongoose.Schema({
  image: {type: String, required: true},
  created: {type: String, default: moment(new Date(Date.now())).format('MMM Do YY')},
  text: {type: String, required: true}
 });

gratPostSchema.methods.serialize = function() {
  return {
    id: this._id,
    image: this.image,
    created: this.created,
    text: this.text
  };
}

const Post = mongoose.model('Post', gratPostSchema);

module.exports = {Post};
