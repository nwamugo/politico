"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _moment = _interopRequireDefault(require("moment"));

var _check = require("express-validator/check");

var _db = _interopRequireDefault(require("../models/db"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = {
  register: async function register(req, res) {
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

    if (req.user.is_admin) {
      var createQuery = "INSERT INTO\n      candidates(office, party, candidate, created_date)\n      VALUES($1, $2, $3, $4)\n      RETURNING *";
      var values = [req.body.office, req.body.party, req.params.user_id, (0, _moment["default"])(new Date())];

      try {
        var _ref = await _db["default"].query(createQuery, values),
            rows = _ref.rows;

        console.log(rows[0]);
        return res.status(201).json({
          status: 201,
          data: [rows[0]]
        });
      } catch (error) {
        if (error.toString() === 'error: duplicate key value violates unique constraint "candidates_pkey"') {
          res.status(409).json({
            status: 409,
            error: 'You cannot vote multiple times for the same office'
          });
        } else if (error.toString() === 'error: insert or update on table "candidates" violates foreign key constraint "candidates_office_fkey"') {
          res.status(404).json({
            status: 404,
            error: 'Please check that the office exists'
          });
        } else if (error.toString() === 'error: insert or update on table "candidates" violates foreign key constraint "candidates_candidate_fkey"') {
          res.status(404).json({
            status: 404,
            error: 'Please check that the user exists'
          });
        } else {
          return res.status(404).json({
            status: 404,
            error: error.toString()
          });
        }
      }
    } else {
      return res.status(401).json({
        status: 401,
        message: 'You don\'t have admin privileges'
      });
    }
  },
  collateAndFetch: async function collateAndFetch(req, res) {
    var createQuery = "SELECT COUNT(votes.candidate)\n    AS result, candidates.office, candidates.id\n    FROM votes JOIN candidates\n    ON candidates.id = votes.candidate\n    WHERE votes.candidate = candidates.id\n    AND candidates.office = $1\n    GROUP BY candidates.id, candidates.candidate, candidates.office";

    try {
      var _ref2 = await _db["default"].query(createQuery, [req.params.office_id]),
          rows = _ref2.rows;

      console.log(rows[0]);

      if (!rows[0]) {
        return res.status(404).json({
          status: 404,
          error: 'Office with that id not found'
        });
      }

      return res.status(201).json({
        status: 201,
        data: [rows[0]]
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: 'Something went wrong with the request'
      });
    }
  }
};
exports["default"] = _default;