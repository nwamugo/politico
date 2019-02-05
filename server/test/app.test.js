import request from 'supertest';
import { expect } from 'chai';

import app from '../app';

const server = request(app);

describe('app', () => {
  after(() => {
    app.server.close();
  });

  context('Welcome GET /', () => {
    it('should test / route', (done) => {
      server.get('/')
        .expect(200)
        .end((err, res) => {
          expect(res.body.data[0]).to.have.property('post_parties').to.equal('/api/v1/parties');
          done(err);
        });
    });
  });

  context('404Error /*', () => {
    it('should test "catch all" /* route', (done) => {
      server.get('/*')
        .expect(404)
        .end((err, res) => {
          expect(res.body).to.have.property('error').to.equal('Page Not Found');
          done(err);
        });
    });
  });
});
