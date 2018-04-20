'use strict'

exports.DATABASE_URL = process.env.DATABASE_URL || 'mongodb://localhost/capture-db';
exports.TEST_DATABASE_URL = process.env.TEST_DATABASE_URL || 'mongodb://localhost/test-capture-db';
exports.PORT = process.env.PORT || 8080;

exports.cloudinary = {
  apiKey: process.env.CLOUDINARY_API_KEY,
  apiSecret: process.env.CLOUDINARY_API_SECRET,
  cloudName: process.env.CLOUDINARY_CLOUD_NAME
}
