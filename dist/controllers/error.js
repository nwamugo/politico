"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = {
  get404: function get404(req, res) {
    res.status(404).json({
      status: 404,
      error: 'Page Not Found'
    });
  }
};
exports["default"] = _default;