const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app.js'); 

const { expect } = chai;
chai.use(chaiHttp);

  describe('GET /history', () => {
    it('should return a detailed history of past intakes', (done) => {
      chai.request(server)
        .get('/history')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array');
          done();
        });
    });
  });

