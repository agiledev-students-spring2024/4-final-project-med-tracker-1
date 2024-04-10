const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const user = require('../models/User');

const SECRET_KEY = process.env.SECRET_KEY || 'secretkey';

router.post('/register', async (req, res) => {
    const { username, password, firstname, confirmPassword } = req.body;
    if (password !== confirmPassword) {
        console.log("Received passwords:", { password, confirmPassword }); 
        return res.status(400).json({ message: "Passwords do not match." });
    }
    if (!username || !password || !firstname) {
        return res.status(400).json({ message: "Please fill out all fields." });
    }
    const userExists = await User.findOne({ email: username });
    if (userExists) {
        return res.status(400).json({ message: "Username already exists." });
    }
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
            email: username,
            preferredFirstName: firstname,
            password: hashedPassword,
        });
        await user.save();
        res.status(201).json({ message: "User registered successfully." });
    } catch (error) {
        res.status(500).json({ message: "Failed to register user." });
    }
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ email: username });
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials." });
        }
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ message: "Invalid credentials." });
        }
        const token = jwt.sign({ username: user.email }, SECRET_KEY);
        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: "Failed to login." });
    }
});

module.exports = router;