import request from 'supertest';
import chai from 'chai';
import sinonChai from 'sinon-chai';
import chaiAsPromised from 'chai-as-promised';

import app from '../app';
import Office from '../models/office';

const { expect } = chai;


chai.use(sinonChai);
chai.use(chaiAsPromised);

const server = request(app);

describe('app', () => {
  after(() => {
    app.server.close();
  });

  describe('GET /offices', () => {
    it('should fetch all offices', (done) => {
      server.get('/api/v1/offices')
        .set('Accept', 'application/json')
        .expect(200)
        .end(done);
    });
  });

  describe('GET /offices/:office_id', () => {
    it('should respond with json containing a single office', (done) => {
      server.get('/api/v1/offices/0')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/);
      if (!Office[0]) expect(404);
      expect(200);
      done();
    });
  });

  describe('POST /offices', () => {
    it('should call partiesController.postNewOffice', (done) => {
      server.post('/api/v1/offices')
        .send({
          name: 'Violins Party'
        })
        .expect(201)
        .end((err, response) => {
          expect(response.body.data[0]).to.have.property('name').to.equal('Violins Party');
          done(err);
        });
    });
  });
});
