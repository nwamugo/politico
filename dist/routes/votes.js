"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _votesController = _interopRequireDefault(require("../controllers/votesController"));

var _auth = _interopRequireDefault(require("../auth/auth"));

var _validation = _interopRequireDefault(require("../auth/validation"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = (0, _express.Router)();
router.post('/', _auth["default"].verifyToken, _validation["default"].checkVotes, _votesController["default"].vote);
var _default = router;
exports["default"] = _default;