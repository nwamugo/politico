"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _db = _interopRequireDefault(require("../models/db"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var Auth = {
  /**
   * Verify Token
   * @param {object} req
   * @param {object} res
   * @param {object} next
   * @returns {object|void} response object
   */
  verifyToken: async function verifyToken(req, res, next) {
    var token = req.headers['x-access-token'];

    if (!token) {
      return res.status(428).json({
        status: 428,
        error: 'Token is not provided'
      });
    }

    try {
      var decoded = await _jsonwebtoken["default"].verify(token, process.env.SECRET);
      var text = 'SELECT * FROM users WHERE id = $1';

      var _ref = await _db["default"].query(text, [decoded.userId]),
          rows = _ref.rows;

      if (rows[0]) {
        var _rows = _slicedToArray(rows, 1),
            user = _rows[0];

        req.user = user;
        next();
      } else {
        return res.status(412).json({
          status: 412,
          error: 'Token is expired or invalid'
        });
      }
    } catch (error) {
      return res.status(424).json({
        status: 424,
        error: 'Something went wrong with authenticating user'
      });
    }
  }
};
var _default = Auth;
exports["default"] = _default;