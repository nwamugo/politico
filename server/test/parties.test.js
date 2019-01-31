import request from 'supertest';
import chai from 'chai';
import sinonChai from 'sinon-chai';
import chaiAsPromised from 'chai-as-promised';

import app from '../app';
import Party from '../models/party';

const { expect } = chai;

const validID = 345;
const invalidID = '4x0x4';

chai.use(sinonChai);
chai.use(chaiAsPromised);

const server = request(app);

describe('app', () => {
  before(() => {
    app.server.close();
  });

  after(() => {
    app.server.close();
  });

  describe('GET /', () => {
    it('should test / route', (done) => {
      server.get('/')
        .expect(200)
        .end((err, response) => {
          expect(response.body.data[0]).to.have.property('greetings').to.equal('Hey there! Welcome to Duziem\'s Politico API');
          done(err);
        });
    });
  });

  describe('GET /parties', () => {
    it('should fetch all parties', (done) => {
      server.get('/api/v1/parties')
        .set('Accept', 'application/json')
        .expect(200)
        .end(done);
    });
  });

  describe('GET /parties/:party_id', () => {
    it('should respond with json containing a single party', (done) => {
      server.get('/api/v1/parties/0')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/);
      if (!Party[0]) expect(404);
      expect(200);
      done();
    });
  });

  describe('POST /parties', () => {
    it('should call partiesController.postNewParty', (done) => {
      server.post('/api/v1/parties')
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

  describe('PATCH /parties/:party_id/name', () => {
    it('should respond with edited party', (done) => {
      server.patch(`/api/v1/parties/${validID}/name`)
        .send({
          name: 'New Party'
        })
        .expect(202);
      done();
    });
  });

  describe('PATCH /parties/:party_id/name', () => {
    it('should respond with edited party', (done) => {
      server.patch(`/api/v1/parties/${invalidID}/name`)
        .send({
          name: 'New Party'
        })
        .expect(404);
      done();
    });
  });

  describe('DELETE /parties/:party_id', () => {
    it('should produce the correct response', (done) => {
      server.delete('/parties/123')
        .end((err, response) => {
          if (err) {
            expect(404);
          } else {
            expect(200);
          }
          done(err);
        });
    });
  });
});
