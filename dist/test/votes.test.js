"use strict";

var _supertest = _interopRequireDefault(require("supertest"));

var _chai = _interopRequireDefault(require("chai"));

var _chaiAsPromised = _interopRequireDefault(require("chai-as-promised"));

var _app = _interopRequireDefault(require("../app"));

var _db = _interopRequireDefault(require("../models/db"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_chai["default"].use(_chaiAsPromised["default"]);

var expect = _chai["default"].expect;
var server = (0, _supertest["default"])(_app["default"]);
var userCredentials = {
  email: 'tadeous@gmail.com',
  password: 'humpty'
};
var userToken = '';
describe('Votes', function () {
  before(function (done) {
    server.post('/api/v1/auth/login').send(userCredentials).end(function (err, res) {
      userToken = res.body.data[0].token;
      expect(res.status).to.equal(200);
      expect(res.body.data).to.be.a('array');
      console.log(userToken);
      done();
    });
  });
  beforeEach(function () {});
  after(function () {
    _app["default"].server.close();
  });
  afterEach(function () {});
  context('POST /votes/', function () {
    it('should produce an error on incomplete data', function (done) {
      server.post('/api/v1/votes').send({
        created_by: 1,
        office: 1
      }).set('x-access-token', userToken).expect(422).end(function (err, res) {
        expect(res.body.errors[0]).to.equal('Candidate field should be a number');
        done();
      });
    });
  });
});