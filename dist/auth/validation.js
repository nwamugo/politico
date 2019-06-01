"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _check = require("express-validator/check");

var validation = {
  checkSignup: [(0, _check.body)('first_name').trim().not().isEmpty().withMessage('First name cannot be empty.'), (0, _check.body)('last_name').trim().not().isEmpty().withMessage('Last name is required.'), (0, _check.body)('email').isEmail().withMessage('Please enter a valid email.').normalizeEmail(), (0, _check.body)('password').trim().isLength({
    min: 4
  }).withMessage('Password should be at least 4 characters'), (0, _check.body)('phone_number').isLength({
    min: 4
  }).withMessage('Phone number must be at least 4 characters long')],
  checkLogin: [(0, _check.body)('email').isEmail().withMessage('Please enter a valid email.').normalizeEmail(), (0, _check.body)('password').trim().isLength({
    min: 4
  }).withMessage('Password should be at least 4 characters')],
  checkPatch: [(0, _check.body)('name').trim().not().isEmpty().withMessage('Name is required'), (0, _check.body)('hq_address').trim(), (0, _check.body)('logo_url').trim()],
  checkNewOffice: [(0, _check.body)('type').trim().not().isEmpty().withMessage('Type is required'), (0, _check.body)('name').trim().not().isEmpty().withMessage('Name is required')],
  checkNewParty: [(0, _check.body)('name').trim().not().isEmpty().withMessage('Name is required')],
  checkNewCandidate: [(0, _check.body)('office').matches(/^\d+$/).withMessage('Office field should be a number'), (0, _check.body)('party').matches(/^\d+$/).withMessage('Party field should be a number'), (0, _check.body)('office').matches(/^\d+$/).withMessage('Candidate field should be a number')],
  checkVotes: [(0, _check.body)('office').matches(/^\d+$/).withMessage('Office field should be a number'), (0, _check.body)('candidate').matches(/^\d+$/).withMessage('Candidate field should be a number')]
};
var _default = validation;
exports["default"] = _default;