"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _partiesController = _interopRequireDefault(require("../controllers/partiesController"));

var _auth = _interopRequireDefault(require("../auth/auth"));

var _validation = _interopRequireDefault(require("../auth/validation"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = (0, _express.Router)(); // POST /parties

router.post('/', _auth["default"].verifyToken, _validation["default"].checkNewParty, _partiesController["default"].postNewParty); // GET /parties

router.get('/', _auth["default"].verifyToken, _partiesController["default"].getAllParties); // GET /parties/:party_id

router.get('/:party_id', _auth["default"].verifyToken, _partiesController["default"].getOneParty); // PATCH /parties/:party_id/name

router.patch('/:party_id/name', _auth["default"].verifyToken, _validation["default"].checkPatch, _partiesController["default"].patchParty); // DELETE /parties/:party_id

router["delete"]('/:party_id', _auth["default"].verifyToken, _partiesController["default"].deleteAParty);
var _default = router;
exports["default"] = _default;