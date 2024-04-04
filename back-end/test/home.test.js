const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app.js'); 

const { expect } = chai;
chai.use(chaiHttp);


  describe('GET /home', () => {
    it('should return a list of medications to take today', (done) => {
      chai.request(server)
        .get('/home')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          expect(res.body.status).to.equal('all good');
          expect(res.body.intakeListToTake).to.be.an('array');
          done();
        });
    });

});
