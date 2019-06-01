"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _http = _interopRequireDefault(require("http"));

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _config = _interopRequireDefault(require("./config"));

var _parties = _interopRequireDefault(require("./routes/parties"));

var _offices = _interopRequireDefault(require("./routes/offices"));

var _office = _interopRequireDefault(require("./routes/office"));

var _votes = _interopRequireDefault(require("./routes/votes"));

var _petitions = _interopRequireDefault(require("./routes/petitions"));

var _user = _interopRequireDefault(require("./routes/user"));

var _error = _interopRequireDefault(require("./controllers/error"));

var _welcome = _interopRequireDefault(require("./controllers/welcome"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();
app.server = _http["default"].createServer(app); // console.log(process.env.NODE_ENV);

app.use(_bodyParser["default"].json());
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, x-access-token');
  next();
});
app.use('/api/v1/parties', _parties["default"]);
app.use('/api/v1/offices', _offices["default"]);
app.use('/api/v1/office', _office["default"]);
app.use('/api/v1/votes', _votes["default"]);
app.use('/api/v1/petitions', _petitions["default"]);
app.use('/api/v1/auth', _user["default"]);
app.get('/', _welcome["default"].welcome);
app.use('/*', _error["default"].get404);
app.server.listen(_config["default"].port);
var _default = app;
exports["default"] = _default;