"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var parties = [];
/**
 * @export
 * @class Party
 */

var Party =
/*#__PURE__*/
function () {
  /**
   *Creates an instance of Party.
   * @param {*} details
   * @memberof Party
   */
  function Party(details) {
    _classCallCheck(this, Party);

    this.name = details.name;
    this.hq_address = details.hq_address || '';
    this.logo_url = details.logo_url || '';
    this.party_id = details.party_id || null;
  }
  /**
   * @memberof Party
   */


  _createClass(Party, [{
    key: "save",
    value: function save() {
      this.party_id = function createId() {
        if (!parties[0]) return 0;
        var lastIndex = parties.length - 1;
        var gettingId = parties[lastIndex].party_id;
        var newId = gettingId + 1;
        return newId;
      }();

      parties.push(this);
    }
    /**
     *
     *
     * @memberof Party
     */

  }, {
    key: "patch",
    value: function patch() {
      var _this = this;

      var existingPartyIndex = parties.findIndex(function (p) {
        return p.party_id === parseInt(_this.party_id, 10);
      });
      parties[existingPartyIndex] = this;
    }
    /**
     * @static
     * @returns
     * @memberof Party
     */

  }], [{
    key: "fetchAll",
    value: function fetchAll() {
      return parties;
    }
    /**
     * @static
     * @param {*} id
     * @returns
     * @memberof Party
     */

  }, {
    key: "findById",
    value: function findById(id) {
      return parties.find(function (p) {
        return p.party_id === parseInt(id, 10);
      });
    }
  }, {
    key: "deleteById",
    value: function deleteById(id) {
      var _this2 = this;

      var partyIndex = parties.findIndex(function (p) {
        return p.party_id === parseInt(_this2.party_id, 10);
      });
      parties.splice(partyIndex, 1);
    }
  }]);

  return Party;
}();

exports["default"] = Party;