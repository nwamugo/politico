import request from 'supertest';
import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import chaiAsPromised from 'chai-as-promised';

import app from '../app';
import officesController from '../controllers/officesController';
import user from '../controllers/userController';
import auth from '../auth/auth';
import db from '../models/db';


chai.use(sinonChai);
chai.use(chaiAsPromised);
const { expect } = chai;
let sandbox = sinon.createSandbox();

const server = request(app);


describe('offices', () => {
  let fakeAuth;
  let authStub;

  beforeEach(() => {
    fakeAuth = (req, res, next) => next();

    authStub = sandbox.stub(auth, 'verifyToken').callsFake(fakeAuth);
  });
  after(() => {
    app.server.close();
  });

  afterEach(() => {
    sandbox.restore();
  });

  // context('GET /offices', () => {
  //   it('should fetch all offices', (done) => {
  //     server.get('/api/v1/offices')
  //       .set('Accept', 'application/json')
  //       .expect(200)
  //       .end(done);
  //   });
  // });

  // describe('GET /offices/:office_id', () => {
  //   it('should respond with json containing a single office', (done) => {
  //     server.get('/api/v1/offices/0')
  //       .set('Accept', 'application/json')
  //       .expect('Content-Type', /json/);
  //     if (!Office[0]) expect(404);
  //     expect(200);
  //     done();
  //   });
  // });

  context('POST /offices', () => {
    let postNewOfficeStub;
    let errorStub;

    it('should call officesController.postNewOffice', (done) => {
      postNewOfficeStub = sandbox.stub(officesController, 'postNewOffice').resolves({
        type: 'Government Tier',
        name: 'Head',
        is_admin: true
      });
      server.post('/api/v1/offices')
        .send({
          type: 'State Government',
          name: 'Governor',
          is_admin: true
        })
        .expect(201)
        .end((err, res) => {
          expect(postNewOfficeStub).to.have.been.calledOnce;
          expect(res.body).to.have.property('name').to.equal('Head');
          done(err);
        });
    });

    // it('should call admin error if not admin', async () => {
    //   postNewOfficeStub = sandbox.stub(officesController, 'postNewOffice').rejects(new Error('not admin'))
    // })
  });
});
