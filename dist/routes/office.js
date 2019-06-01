"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _officeController = _interopRequireDefault(require("../controllers/officeController"));

var _auth = _interopRequireDefault(require("../auth/auth"));

var _validation = _interopRequireDefault(require("../auth/validation"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = (0, _express.Router)();
router.post('/:user_id/register', _auth["default"].verifyToken, _validation["default"].checkNewCandidate, _officeController["default"].register);
router.get('/:office_id/result', _auth["default"].verifyToken, _officeController["default"].collateAndFetch);
var _default = router;
exports["default"] = _default;