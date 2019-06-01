"use strict";

var _database = _interopRequireDefault(require("./database"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var queryText = "\nCREATE TABLE IF NOT EXISTS\nparties(\nid SERIAL PRIMARY KEY,\nname VARCHAR(128) UNIQUE NOT NULL,\nhq_address TEXT,\nlogo_url VARCHAR(128),\ncreated_date TIMESTAMP\n);\n\nCREATE TABLE IF NOT EXISTS\noffices(\nid SERIAL PRIMARY KEY,\ntype VARCHAR(128) NOT NULL,\nname VARCHAR(128) UNIQUE NOT NULL,\ncreated_date TIMESTAMP\n);  \n\nCREATE TABLE IF NOT EXISTS\nusers(\nid SERIAL PRIMARY KEY,\nfirst_name VARCHAR(128) NOT NULL,\nlast_name VARCHAR(128) NOT NULL,\nother_name VARCHAR(128),\nphone_number VARCHAR(128) NOT NULL,\nemail VARCHAR(128) UNIQUE NOT NULL,\npassword VARCHAR(128) NOT NULL,\npassport_url VARCHAR(128),\nis_admin BOOLEAN,\ncreated_date TIMESTAMP\n);\n\nCREATE TABLE IF NOT EXISTS\ncandidates(\nid SERIAL UNIQUE,\noffice INT REFERENCES offices(id),\nparty INT REFERENCES parties(id),\ncandidate INT REFERENCES users(id),\ncreated_date TIMESTAMP,\nPRIMARY KEY(office, candidate)\n);\n\nCREATE TABLE IF NOT EXISTS\nvotes(\nid SERIAL UNIQUE,\ncreated_on TIMESTAMP,\ncreated_by INT REFERENCES users(id),\noffice INT REFERENCES offices(id),\ncandidate INT REFERENCES candidates(id),\nPRIMARY KEY(office, created_by)\n);\n\nCREATE TABLE IF NOT EXISTS\npetitions(\nid SERIAL PRIMARY KEY,\ncreated_on TIMESTAMP,\ncreated_by INT NOT NULL,\noffice INT NOT NULL,\nFOREIGN KEY (created_by) REFERENCES users (id) ON DELETE CASCADE,\nFOREIGN KEY (office) REFERENCES offices (id) ON DELETE CASCADE,\nbody TEXT NOT NULL\n);\n";

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