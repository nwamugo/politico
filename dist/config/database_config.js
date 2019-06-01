"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var dotenv = require('dotenv');

dotenv.config();
var _default = {
  test: {
    user: 'plhpvtzz',
    host: 'baasu.db.elephantsql.com',
    database: 'plhpvtzz',
    password: process.env.test_DATABASE,
    port: 5432
  },
  development: {
    user: 'fdjjtdih',
    host: 'pellefant.db.elephantsql.com',
    database: 'fdjjtdih',
    password: process.env.DATABASE_PASSWORD,
    port: 5432
  }
};
exports["default"] = _default;