const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app.js');

const { expect } = chai;
chai.use(chaiHttp);

  describe('GET /home', () => {
    it('should return a list of medications to take today with status all good', (done) => {
      chai.request(server)
        .get('/home')
        .end(function(err, res) {
          expect(res).to.have.status(200);
          // expect(res.body).to.be.an('object');
          expect(res.body.status).to.equal('all good');
          // expect(res.body.intakeListToTake).to.be.an('array');
          done();
        });
    });

    it('should return an error if list of medicines fails to be load ', (done) => {
      chai.request(server)
        .get('/api/home')
        .query({})
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.status).to.equal('Failed to load your list of medicines');
          done();
        });
    });
  });

