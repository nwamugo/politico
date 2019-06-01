import request from 'supertest';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';

import app from '../app';
import db from '../models/db';

chai.use(chaiAsPromised);
const { expect } = chai;

const server = request(app);

const userCredentials = {
  email: 'tadeous@gmail.com',
  password: 'humpty'
};

let userToken = '';


describe('Political parties', () => {
  before((done) => {
    server.post('/api/v1/auth/login')
      .send(userCredentials)
      .end((err, res) => {
        userToken = res.body.data[0].token;
        expect(res.status).to.equal(200);
        expect(res.body.data).to.be.a('array');
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


  context('POST /parties', () => {
    it('should create a new political party', (done) => {
      server.post('/api/v1/parties')
        .send({
          name: 'Young Progressive Party',
          hq_address: 'Ajao Estate, Lagos'
        })
        .set('x-access-token', userToken)
        .expect(201)
        .end((err, res) => {
          expect(res.body.data[0]).to.be.a('object');
          expect(res.body.data[0]).to.have.property('name').to.equal('Young Progressive Party');
          done(err);
        });
    });
  });

  context('GET /parties', () => {
    it('should fetch all parties', (done) => {
      server.get('/api/v1/parties')
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

  context('GET /parties/:party_id', () => {
    it('should respond with json containing a single political party', (done) => {
      server.get('/api/v1/parties/1')
        .set('Accept', 'application/json')
        .set('x-access-token', userToken)
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          expect(res.body.data[0]).to.be.a('object');
          expect(res.body.data[0]).to.have.property('name').to.equal('Young Progressive Party');
          done(err);
        });
    });
  });

  context('PATCH /parties/:party_id/name', () => {
    it('should be able to edit a specific party', (done) => {
      server.patch('/api/v1/parties/1/name')
        .send({
          name: 'The Chicago Bulls',
        })
        .set('x-access-token', userToken)
        .expect(200)
        .end((err, res) => {
          expect(res.body.data[0]).to.have.property('name').to.equal('The Chicago Bulls');
          done(err);
        });
    });
  });

  context('DELETE /parties/:party_id', () => {
    it('should delete a particular party on success', (done) => {
      server.delete('/api/v1/parties/1')
        .set('x-access-token', userToken)
        .expect(410)
        .end((err, res) => {
          expect(res.body.message).to.equal('Party successfully deleted!');
          done(err);
        });
    });
  });
});
