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
  first_name: 'Jane',
  last_name: 'Anaekwe',
  other_name: '',
  phone_number: '0806900974',
  email: 'tadeous@gmail.com',
  password: 'humpty'
};
var userToken = '';
describe('offices', function () {
  before(function (done) {
    server.post('/api/v1/auth/signup').send(userCredentials).end(function (err, res) {
      userToken = res.body.data[0].token;
      expect(res.status).to.equal(201);
      expect(res.body.data).to.be.a('array');
      console.log(userToken);
      var setAdmin = "UPDATE users\n    SET is_admin=$1\n    WHERE id=$2 returning *";
      var values = [true, 1];

      _db["default"].query(setAdmin, values);

      done();
    });
  });
  beforeEach(function () {});
  after(function () {
    _app["default"].server.close();
  });
  afterEach(function () {});
  context('POST /offices', function () {
    it('should create a new office', function (done) {
      server.post('/api/v1/offices').send({
        type: 'State Government',
        name: 'Governor'
      }).set('x-access-token', userToken).expect(201).end(function (err, res) {
        expect(res.body.data[0]).to.be.a('object');
        expect(res.body.data[0]).to.have.property('name').to.equal('Governor');
        done(err);
      });
    });
  });
  context('GET /offices', function () {
    it('should fetch all offices', function (done) {
      server.get('/api/v1/offices').set('Accept', 'application/json').set('x-access-token', userToken).expect(200).end(function (err, res) {
        expect(res.body.data[0]).to.be.a('object');
        expect(res.body.data[0]).to.have.property('total').to.be.a('Number');
        done(err);
      });
    });
  });
  context('GET /offices/:office_id', function () {
    it('should respond with json containing a single office', function (done) {
      server.get('/api/v1/offices/1').set('Accept', 'application/json').set('x-access-token', userToken).expect('Content-Type', /json/).expect(200).end(function (err, res) {
        console.log(res.body);
        expect(res.body.data[0]).to.be.a('object');
        expect(res.body.data[0]).to.have.property('name').to.equal('Governor');
        done(err);
      });
    });
  });
});