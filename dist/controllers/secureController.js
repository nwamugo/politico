"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Secure = {
  hashPassword: function hashPassword(password) {
    return _bcryptjs["default"].hashSync(password, _bcryptjs["default"].genSaltSync(8));
  },
  comparePassword: function comparePassword(hashPassword, password) {
    return _bcryptjs["default"].compareSync(password, hashPassword);
  },
  isValidEmail: function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  },
  generateToken: function generateToken(id) {
    var token = _jsonwebtoken["default"].sign({
      userId: id
    }, process.env.SECRET, {
      expiresIn: '3d'
    });

    return token;
  }
};
var _default = Secure;
exports["default"] = _default;