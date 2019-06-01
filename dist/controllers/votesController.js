"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _check = require("express-validator/check");

var _moment = _interopRequireDefault(require("moment"));

var _db = _interopRequireDefault(require("../models/db"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = {
  vote: async function vote(req, res) {
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

    var createQuery = "INSERT INTO\n    votes(created_on, created_by, office, candidate)\n    VALUES($1, $2, $3, $4)\n    RETURNING *";
    var values = [(0, _moment["default"])(new Date()), req.user.id, req.body.office, req.body.candidate];

    try {
      var _ref = await _db["default"].query(createQuery, values),
          rows = _ref.rows;

      return res.status(201).json({
        status: 201,
        data: [rows[0]]
      });
    } catch (error) {
      if (error.toString() === 'error: insert or update on table "votes" violates foreign key constraint "votes_candidate_fkey"') {
        res.status(404).json({
          status: 404,
          error: 'Please check that the candidate exists'
        });
      } else if (error.toString() === 'error: insert or update on table "votes" violates foreign key constraint "votes_office_fkey"') {
        return res.status(404).json({
          status: 404,
          error: 'Please check that the office exists'
        });
      } else if (error.toString() === 'error: duplicate key value violates unique constraint "votes_pkey"') {
        return res.status(409).json({
          status: 409,
          error: 'Duplicate voting is not allowed'
        });
      } else {
        return res.status(404).json({
          status: 404,
          error: error.toString()
        });
      }
    }
  }
};
exports["default"] = _default;