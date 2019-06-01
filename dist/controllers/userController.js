"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _check = require("express-validator/check");

var _moment = _interopRequireDefault(require("moment"));

var _db = _interopRequireDefault(require("../models/db"));

var _secureController = _interopRequireDefault(require("./secureController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var User = {
  signup: async function signup(req, res) {
    var errors = (0, _check.validationResult)(req);

    if (!errors.isEmpty()) {
      var error = errors.array().map(function (a) {
        return a.msg;
      });
      return res.status(422).json({
        status: 422,
        errors: error
      });
    }

    if (!req.body.email || !req.body.password) {
      return res.status(400).json({
        status: 400,
        error: 'Some details are missing'
      });
    }

    if (!_secureController["default"].isValidEmail(req.body.email)) {
      return res.status(400).json({
        status: 400,
        error: 'Please enter a valid email address'
      });
    }

    var hashPassword = _secureController["default"].hashPassword(req.body.password);

    var createQuery = "INSERT INTO\n      users(first_name, last_name, other_name, phone_number, email, password, passport_url, created_date)\n      VALUES($1, $2, $3, $4, $5, $6, $7, $8)\n      RETURNING *";
    var values = [req.body.first_name, req.body.last_name, req.body.other_name, req.body.phone_number, req.body.email, hashPassword, req.body.passport_url, (0, _moment["default"])(new Date())];

    try {
      var _ref = await _db["default"].query(createQuery, values),
          rows = _ref.rows;

      var token = _secureController["default"].generateToken(rows[0].id);

      return res.status(201).json({
        status: 201,
        data: [{
          token: token,
          user: rows[0]
        }]
      });
    } catch (error) {
      return res.status(400).json({
        status: 400,
        error: 'Could not authenticate database password'
      });
    }
  },
  login: async function login(req, res) {
    var errors = (0, _check.validationResult)(req);

    if (!errors.isEmpty()) {
      var error = errors.array().map(function (a) {
        return a.msg;
      });
      return res.status(422).json({
        status: 422,
        errors: error
      });
    }

    if (!req.body.email || !req.body.password) {
      return res.status(400).json({
        status: 400,
        message: 'Some values are missing'
      });
    }

    if (!_secureController["default"].isValidEmail(req.body.email)) {
      return res.status(400).json({
        status: 400,
        message: 'Please enter a valid email address'
      });
    }

    var text = 'SELECT * FROM users WHERE email = $1';

    try {
      var _ref2 = await _db["default"].query(text, [req.body.email]),
          rows = _ref2.rows;

      if (!rows[0]) {
        return res.status(400).json({
          status: 400,
          message: 'The details are incorrect'
        });
      }

      if (!_secureController["default"].comparePassword(rows[0].password, req.body.password)) {
        return res.status(400).json({
          status: 400,
          error: 'Incorrect password'
        });
      }

      var token = _secureController["default"].generateToken(rows[0].id);

      return res.status(200).json({
        status: 200,
        data: [{
          token: token,
          user: rows[0]
        }]
      });
    } catch (error) {
      return res.status(400).json({
        status: 400,
        error: 'Cannot reach database!'
      });
    }
  }
};
var _default = User;
exports["default"] = _default;