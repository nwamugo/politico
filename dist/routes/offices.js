"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _officesController = _interopRequireDefault(require("../controllers/officesController"));

var _auth = _interopRequireDefault(require("../auth/auth"));

var _validation = _interopRequireDefault(require("../auth/validation"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = (0, _express.Router)(); // POST /offices

router.post('/', _auth["default"].verifyToken, _validation["default"].checkNewOffice, _officesController["default"].postNewOffice); // GET /offices

router.get('/', _auth["default"].verifyToken, _officesController["default"].getAllOffices); // GET /offices/:office_id

router.get('/:office_id', _auth["default"].verifyToken, _officesController["default"].getOneOffice);
var _default = router;
exports["default"] = _default;