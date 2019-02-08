import request from 'supertest';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';

import app from '../app';
import db from '../models/db';


chai.use(chaiAsPromised);
const { expect } = chai;

const server = request(app);

const userCredentials = {
  first_name: 'Jane',
  last_name: 'Anaekwe',
  other_name: '',
  phone_number: '0806900974',
  email: 'tadeous@gmail.com',
  password: 'humpty'
};

let userToken = '';


describe('offices', () => {
  before((done) => {
    server.post('/api/v1/auth/signup')
      .send(userCredentials)
      .end((err, res) => {
        userToken = res.body.data[0].token;
        expect(res.status).to.equal(201);
        expect(res.body.data).to.be.a('array');
        console.log(userToken);
        const setAdmin = `UPDATE users
    SET is_admin=$1
    WHERE id=$2 returning *`;
        const values = [
          true,
          1
        ];
        db.query(setAdmin, values);
        done();
      });
  });
  beforeEach(() => {

  });
  after(() => {
    app.server.close();
  });

  afterEach(() => {

  });


  context('POST /offices', () => {
    it('should create a new office', (done) => {
      server.post('/api/v1/offices')
        .send({
          type: 'State Government',
          name: 'Governor',
        })
        .set('x-access-token', userToken)
        .expect(201)
        .end((err, res) => {
          expect(res.body.data[0]).to.be.a('object');
          expect(res.body.data[0]).to.have.property('name').to.equal('Governor');
          done(err);
        });
    });
  });

  context('GET /offices', () => {
    it('should fetch all offices', (done) => {
      server.get('/api/v1/offices')
        .set('Accept', 'application/json')
        .set('x-access-token', userToken)
        .expect(200)
        .end((err, res) => {
          expect(res.body.data[0]).to.be.a('object');
          expect(res.body.data[0]).to.have.property('total').to.be.a('Number');
          done(err);
        });
    });
  });

  context('GET /offices/:office_id', () => {
    it('should respond with json containing a single office', (done) => {
      server.get('/api/v1/offices/1')
        .set('Accept', 'application/json')
        .set('x-access-token', userToken)
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          console.log(res.body);
          expect(res.body.data[0]).to.be.a('object');
          expect(res.body.data[0]).to.have.property('name').to.equal('Governor');
          done(err);
        });
    });
  });
});
