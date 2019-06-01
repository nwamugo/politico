"use strict";

var _database = _interopRequireDefault(require("./database"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var queryText = "\nDROP TABLE IF EXISTS parties, offices, candidates, votes, petitions, users CASCADE;\n";

_database["default"].query(queryText).then(function (res) {
  console.log(res);

  _database["default"].end();
})["catch"](function (err) {
  console.log(err.toString());

  _database["default"].end();
});

_database["default"].on('remove', function () {
  console.log('We are going up!');
  process.exit(0);
});