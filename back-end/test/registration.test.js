const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app.js'); 

const { expect } = chai;
chai.use(chaiHttp);

describe('Registration', () => {
  const uniqueTimestamp = Date.now();

  it('should register a new user successfully', done => {
    const user = {
      firstname: 'TestUser',
      username: `test${uniqueTimestamp}@example.com`,
      password: 'password123',
      confirmPassword: 'password123'
    };

    chai.request(server)
      .post('/api/register')
      .send(user)
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });

  it('should return an error for password mismatch', done => {
    const user = {
      firstname: 'TestUser',
      username: `test${uniqueTimestamp + 1}@example.com`,
      password: 'password123',
      confirmPassword: 'wrongPassword'
    };

    chai.request(server)
      .post('/api/register')
      .send(user)
      .end((err, res) => {
        expect(res).to.have.status(409); 
        expect(res.body.message).to.equal('Passwords do not match.');
        done();
      });
  });
});
