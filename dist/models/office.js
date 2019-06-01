"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var offices = [];
/**
 * @export
 * @class Office
 */

var Office =
/*#__PURE__*/
function () {
  /**
   *Creates an instance of Office.
   * @param {*} details
   * @memberof Office
   */
  function Office(details) {
    _classCallCheck(this, Office);

    this.name = details.name;
    this.type = details.type;

    this.office_id = function createId() {
      if (!offices[0]) {
        return 0;
      }

      var lastIndex = offices.length - 1;
      var gettingId = offices[lastIndex].id;
      var newId = gettingId + 1;
      return newId;
    }();
  }
  /**
   * @memberof Office
   */


  _createClass(Office, [{
    key: "save",
    value: function save() {
      offices.push(this);
    }
    /**
     * @static
     * @returns
     * @memberof Office
     */

  }], [{
    key: "fetchAll",
    value: function fetchAll() {
      return offices;
    }
    /**
     * @static
     * @param {*} id
     * @returns
     * @memberof Office
     */

  }, {
    key: "findById",
    value: function findById(id) {
      return offices.find(function (o) {
        return o.office_id === parseInt(id, 10);
      });
    }
  }]);

  return Office;
}();

exports["default"] = Office;