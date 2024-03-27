require('dotenv').config({ silent: true }); // Load environmental variables from .env
const express = require('express');
const app = express();

app.use(express.json());

let users = {};

const mockUser = {
  username: 'user@example.com',
  password: 'password123',
  firstname: 'Yvette'
};

app.post('/api/register', (req, res) => {
  const { username, password, firstname } = req.body; 

  if (!username || !password || !firstname) {
    return res.status(400).send({ success: false, message: "Username, password, and first name are required." });
  }

  if (users[username] || (mockUser.username === username)) {
    return res.status(409).send({ success: false, message: "User already exists." });
  }

  users[username] = { username, password, firstname }; 
  res.send({ success: true, message: "Registration successful." });
});

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  if (username === mockUser.username && password === mockUser.password) {
    return res.send({ success: true, message: `Login successful with mock user: ${mockUser.firstname}.` });
  }

  if (users[username] && users[username].password === password) {
    return res.send({ success: true, message: `Login successful with registered user: ${users[username].firstname}.` });
  }

  res.status(401).send({ success: false, message: "Invalid credentials." });
});

module.exports = app;
