"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _pg = require("pg");

var _dotenv = _interopRequireDefault(require("dotenv"));

var _database_config = _interopRequireDefault(require("../config/database_config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_dotenv["default"].config();

var env = process.env.NODE_ENV || 'development';

var connectionObject = _database_config["default"][env.trim()];

var pool = new _pg.Pool(connectionObject); // const pool = new Pool({
//   user: 'fdjjtdih',
//   host: 'pellefant.db.elephantsql.com',
//   database: 'fdjjtdih',
//   password: process.env.DATABASE_PASSWORD,
//   port: '5432'
// });

var _default = {
  query: function query(text, params) {
    return new Promise(function (resolve, reject) {
      pool.query(text, params).then(function (res) {
        resolve(res);
      })["catch"](function (err) {
        reject(err.toString());
      });
    });
  }
};
exports["default"] = _default;