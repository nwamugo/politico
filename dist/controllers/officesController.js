"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _moment = _interopRequireDefault(require("moment"));

var _check = require("express-validator/check");

var _db = _interopRequireDefault(require("../models/db"));

var _helper = _interopRequireDefault(require("./helper"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = {
  postNewOffice: async function postNewOffice(req, res) {
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

    var createQuery = "INSERT INTO\n    offices(type, name, created_date)\n    VALUES($1, $2, $3)\n    RETURNING *";
    var values = [req.body.type, req.body.name, (0, _moment["default"])(new Date())];

    if (req.user.is_admin) {
      try {
        var _ref = await _db["default"].query(createQuery, values),
            rows = _ref.rows;

        return res.status(201).json({
          status: 201,
          data: [rows[0]]
        });
      } catch (error) {
        return res.status(409).json({
          status: 409,
          error: 'There cannot be multiple offices of the same name'
        });
      }
    } else {
      return res.status(401).json({
        status: 401,
        message: 'You don\'t have admin privileges'
      });
    }
  },
  getAllOffices: async function getAllOffices(req, res) {
    try {
      var _ref2 = await _db["default"].query('SELECT * FROM offices'),
          rows = _ref2.rows,
          rowCount = _ref2.rowCount;

      var allOffices = rows;
      var total = rowCount;
      return res.status(200).json({
        status: 200,
        data: [{
          allOffices: allOffices,
          total: total
        }]
      });
    } catch (err) {
      res.status(500).json({
        status: 500,
        error: 'Oops! failed to process your request'
      });
    }
  },
  getOneOffice: async function getOneOffice(req, res) {
    if (_helper["default"].officeIdFail(req)) {
      return res.status(422).json({
        status: 422,
        error: 'Invalid office id'
      });
    }

    var text = 'SELECT * FROM offices WHERE id = $1';

    try {
      var _ref3 = await _db["default"].query(text, [req.params.office_id]),
          rows = _ref3.rows;

      if (!rows[0]) {
        return res.status(404).json({
          status: 404,
          error: 'Office was not found'
        });
      }

      return res.status(200).json({
        status: 200,
        data: [rows[0]]
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: 'Something went wrong while processing your request'
      });
    }
  }
};
exports["default"] = _default;