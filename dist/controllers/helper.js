"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = {
  partyIdFail: function partyIdFail(req) {
    return req.params.party_id % 1 !== 0 || parseInt(req.params.party_id, 10) < 1;
  },
  officeIdFail: function officeIdFail(req) {
    return req.params.office_id % 1 !== 0 || parseInt(req.params.office_id, 10) < 1;
  }
};
exports["default"] = _default;