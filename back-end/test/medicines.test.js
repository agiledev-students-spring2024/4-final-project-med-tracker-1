const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app.js'); 

const { expect } = chai;
chai.use(chaiHttp);

describe('GET /medicines', () => {
  it('should fetch all medicines successfully', (done) => {
    chai.request(app)
      .get('/medicines')
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body.medList).to.be.an('array');
        expect(res.body.status).to.equal('all good');

        // Assertions to test the structure of the data
        if (res.body.medList.length > 0) {
          expect(res.body.medList[0]).to.have.all.keys('medID', 'medName', 'photo', 'totalAmt', 'unit', 'date', 'refillAmt', 'frequency', 'interval', 'selectedDays', 'numIntake', 'intakeList');
        }

        done();
      });
  });
});
