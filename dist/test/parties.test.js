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
describe('Political parties', function () {
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
  context('POST /parties', function () {
    it('should create a new political party', function (done) {
      server.post('/api/v1/parties').send({
        name: 'Young Progressive Party',
        hq_address: 'Ajao Estate, Lagos'
      }).set('x-access-token', userToken).expect(201).end(function (err, res) {
        expect(res.body.data[0]).to.be.a('object');
        expect(res.body.data[0]).to.have.property('name').to.equal('Young Progressive Party');
        done(err);
      });
    });
  });
  context('GET /parties', function () {
    it('should fetch all parties', function (done) {
      server.get('/api/v1/parties').set('Accept', 'application/json').set('x-access-token', userToken).expect(200).end(function (err, res) {
        expect(res.body.data[0]).to.be.a('object');
        expect(res.body.data[0]).to.have.property('total').to.be.a('Number');
        done(err);
      });
    });
  });
  context('GET /parties/:party_id', function () {
    it('should respond with json containing a single political party', function (done) {
      server.get('/api/v1/parties/1').set('Accept', 'application/json').set('x-access-token', userToken).expect('Content-Type', /json/).expect(200).end(function (err, res) {
        console.log(res.body);
        expect(res.body.data[0]).to.be.a('object');
        expect(res.body.data[0]).to.have.property('name').to.equal('Young Progressive Party');
        done(err);
      });
    });
  });
  context('PATCH /parties/:party_id/name', function () {
    it('should be able to edit a specific party', function (done) {
      server.patch('/api/v1/parties/1/name').send({
        name: 'The Chicago Bulls'
      }).set('x-access-token', userToken).expect(200).end(function (err, res) {
        expect(res.body.data[0]).to.have.property('name').to.equal('The Chicago Bulls');
        done(err);
      });
    });
  });
  context('DELETE /parties/:party_id', function () {
    it('should delete a particular party on success', function (done) {
      server["delete"]('/api/v1/parties/1').set('x-access-token', userToken).expect(410).end(function (err, res) {
        console.log(res.body);
        expect(res.body.message).to.equal('Party successfully deleted!');
        done(err);
      });
    });
  });
});