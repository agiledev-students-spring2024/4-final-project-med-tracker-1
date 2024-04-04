const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app.js'); 
const fs = require('fs')

const { expect } = chai;
chai.use(chaiHttp);

describe('POST /photo-upload', () => {
  it('should upload a photo and return a success response', (done) => {
    chai.request(app)
      .post('/photo-upload')
      .attach('file', fs.readFileSync('./public/med-images/1712009434896_midol.jpeg'), 'photo.jpg') // Adjust the path to your test file
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('status', 'all good');
        expect(res.body).to.have.property('photo');
        done();
      });
  });

  it('should handle errors when no file is uploaded', (done) => {
    chai.request(app)
      .post('/photo-upload')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('status', 'failed to save uploaded image');
        done();
      });
  });
});

describe('POST /add-medicine-1/save', () => {
  it('should save medicine data and return success', (done) => {
    const medData = { medName: 'Aspirin', photo: 'url/to/photo.jpg', totalAmt: 100, unit: 'mg' };
    chai.request(app)
      .post('/add-medicine-1/save')
      .send(medData)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('status', 'all good');
        expect(res.body.med).to.include(medData);
        done();
      });
  });
});

describe('POST /add-medicine-2/:medID/save', () => {
  it('should update medicine info and return success', (done) => {
    const medID = 2;
    const newMedInfo = { totalAmt: 60 }; 
    chai.request(app)
      .post(`/add-medicine-2/${medID}/save`)
      .send(newMedInfo)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('status', 'all good');
        done();
      });
  });
});

describe('GET /medicine/:medID', () => {
  it('should return the medicine data for the given ID', (done) => {
    const medID = 2;
    chai.request(app)
      .get(`/medicine/${medID}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('status', 'all good');
        expect(res.body).to.have.property('med');
        expect(res.body.med).to.have.property('medID', medID);
        done();
      });
  });

  it('should return an error if the medicine does not exist', (done) => {
    const medID = 'nonExistentID';
    chai.request(app)
      .get(`/medicine/${medID}`)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('status', 'failed to find the med using medID');
        expect(res.body).to.have.property('error', 'no matched medID');
        done();
      });
  });
});