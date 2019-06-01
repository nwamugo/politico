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
  postNewParty: async function postNewParty(req, res) {
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

    var createQuery = "INSERT INTO\n    parties(name, hq_address, logo_url, created_date)\n    VALUES($1, $2, $3, $4)\n    RETURNING *";
    var values = [req.body.name, req.body.hq_address, req.body.logo_url, (0, _moment["default"])(new Date())];

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
          error: 'There cannot be two parties of the same name'
        });
      }
    } else {
      return res.status(401).json({
        status: 401,
        message: 'You don\'t have admin privileges'
      });
    }
  },
  patchParty: async function patchParty(req, res) {
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

    if (_helper["default"].partyIdFail(req)) {
      return res.status(422).json({
        status: 422,
        error: 'Invalid party id'
      });
    }

    var findOneParty = 'SELECT * FROM parties WHERE id=$1';
    var editOneParty = "UPDATE parties\n    SET name=$1, hq_address=$2, logo_url=$3\n    WHERE id=$4 returning *";

    if (req.user.is_admin) {
      try {
        var _ref2 = await _db["default"].query(findOneParty, [req.params.party_id]),
            rows = _ref2.rows;

        if (!rows[0]) {
          return res.status(404).json({
            status: 404,
            error: 'Party not found'
          });
        }

        var values = [req.body.name || rows[0].name, req.body.hq_address || rows[0].hq_address, req.body.logo_url || rows[0].logo_url, req.params.party_id];
        var response = await _db["default"].query(editOneParty, values);
        return res.status(200).json({
          status: 200,
          data: [response.rows[0]]
        });
      } catch (err) {
        return res.status(501).json({
          status: 501,
          error: 'Could not successfully edit party. Please note that two parties cannot have the same name!'
        });
      }
    } else {
      return res.status(401).json({
        status: 401,
        message: 'You don\'t have admin privileges'
      });
    }
  },
  getAllParties: async function getAllParties(req, res) {
    try {
      var _ref3 = await _db["default"].query('SELECT * FROM parties'),
          rows = _ref3.rows,
          rowCount = _ref3.rowCount;

      var allParties = rows;
      var total = rowCount;
      return res.status(200).json({
        status: 200,
        data: [{
          allParties: allParties,
          total: total
        }]
      });
    } catch (err) {
      res.status(501).json({
        status: 501,
        error: 'Could not get all parties'
      });
    }
  },
  getOneParty: async function getOneParty(req, res) {
    if (_helper["default"].partyIdFail(req)) {
      return res.status(422).json({
        status: 422,
        error: 'Invalid party id'
      });
    }

    var text = 'SELECT * FROM parties WHERE id = $1';

    try {
      var _ref4 = await _db["default"].query(text, [req.params.party_id]),
          rows = _ref4.rows;

      if (!rows[0]) {
        return res.status(404).json({
          status: 404,
          error: 'Party was not found'
        });
      }

      return res.status(200).json({
        status: 200,
        data: [rows[0]]
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: 'The request failed!'
      });
    }
  },
  deleteAParty: async function deleteAParty(req, res) {
    if (_helper["default"].partyIdFail(req)) {
      return res.status(422).json({
        status: 422,
        error: 'Invalid party id'
      });
    }

    var deleteQuery = 'DELETE FROM parties WHERE id=$1 returning *';

    if (req.user.is_admin) {
      try {
        var _ref5 = await _db["default"].query(deleteQuery, [req.params.party_id]),
            rows = _ref5.rows;

        if (!rows[0]) {
          return res.status(404).json({
            status: 404,
            error: 'Party not found'
          });
        }

        return res.status(410).json({
          status: 410,
          message: 'Party successfully deleted!'
        });
      } catch (error) {
        return res.status(501).json({
          status: 501,
          error: 'Oops! Could not delete'
        });
      }
    } else {
      return res.status(401).json({
        status: 401,
        message: 'You don\'t have admin privileges'
      });
    }
  }
};
exports["default"] = _default;