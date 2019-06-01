"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _validation = _interopRequireDefault(require("../auth/validation"));

var _userController = _interopRequireDefault(require("../controllers/userController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = (0, _express.Router)();
console.log(_userController["default"].signup); // signup route (/api/v1/auth)

router.post('/signup', _validation["default"].checkSignup, _userController["default"].signup); // login route (/api/v1/auth)

router.post('/login', _validation["default"].checkLogin, _userController["default"].login);
var _default = router;
exports["default"] = _default;