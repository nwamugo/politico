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


describe('Votes', () => {
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


  context('POST /votes/', () => {
    it('should produce an error on incomplete data', (done) => {
      server.post('/api/v1/votes')
        .send({
          created_by: 1,
          office: 1,
        })
        .set('x-access-token', userToken)
        .expect(422)
        .end((err, res) => {
          expect(res.body.errors[0]).to.equal('Candidate field should be a number');
          done();
        });
    });
  });
});
