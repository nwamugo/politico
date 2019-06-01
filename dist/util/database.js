"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _pg = _interopRequireDefault(require("pg"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _database_config = _interopRequireDefault(require("../config/database_config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_dotenv["default"].config();

var env = process.env.NODE_ENV || 'development';
console.log(env);
var connectionObject = _database_config["default"][env];
var pool = new _pg["default"].Pool(connectionObject);
pool.on('connect', function () {
  console.log('connected to the Database');
});
pool.on('remove', function () {
  console.log('We are going up!');
  process.exit(0);
});
var _default = pool;
exports["default"] = _default;