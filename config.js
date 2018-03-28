'use strict'
exports.DATABASE_URL = process.env.DATABASE_URL || 'mongodb://localhost/blogapi';
exports.TEST_DATABASE_URL = process.env.TEST_DATABASE_URL || 'mongodb://localhost/blogapitest';
exports.PORT = process.env.PORT || 8080;