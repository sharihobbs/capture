'use strict'

exports.DATABASE_URL = process.env.DATABASE_URL || 'mongodb://localhost/capture-db';
exports.TEST_DATABASE_URL = process.env.TEST_DATABASE_URL || 'mongodb://localhost/test-capture-db';
exports.PORT = process.env.PORT || 8080;

