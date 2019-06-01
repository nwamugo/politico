"use strict";

var _supertest = _interopRequireDefault(require("supertest"));

var _chai = require("chai");

var _app = _interopRequireDefault(require("../app"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var server = (0, _supertest["default"])(_app["default"]);
describe('app', function () {
  after(function () {
    _app["default"].server.close();
  });
  context('Welcome GET /', function () {
    it('should test / route', function (done) {
      server.get('/').expect(200).end(function (err, res) {
        (0, _chai.expect)(res.body.data[0]).to.have.property('post_parties').to.equal('/api/v1/parties');
        done(err);
      });
    });
  });
  context('404Error /*', function () {
    it('should test "catch all" /* route', function (done) {
      server.get('/*').expect(404).end(function (err, res) {
        (0, _chai.expect)(res.body).to.have.property('error').to.equal('Page Not Found');
        done(err);
      });
    });
  });
});