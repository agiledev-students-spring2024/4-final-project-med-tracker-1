const express = require('express');
const router = express.Router();
 
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.SECRET_KEY || 'secretkey';

const handleSubmitRegister = async (req, res) => {
    const { username, password, firstname, confirmPassword } = req.body;
    if (password !== confirmPassword) {
        return res.status(400).json({ message: "Passwords do not match." });
    }
    if (!username || !password || !firstname) {
        return res.status(400).json({ message: "Please fill out all fields." });
    }
    // Need to check if the user already exists in the database
    if (userExists) {
        return res.status(400).json({ message: "Username already exists." });
    }
    next();
};

router.post('/register', handleSubmitRegister, async (req, res) => {
    const { username, password, firstname } = req.body;
    try{
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = {
            username,
            password: hashedPassword,
            firstname,
        };
        await User.create(user);
        res.status(201).json({ message: "User registered successfully." });
    } catch (error) {
        res.status(500).json({ message: "Failed to register user." });
    }
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials." });
        }
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ message: "Invalid credentials." });
        }
        const token = jwt.sign({ username: user.username }, SECRET_KEY);
        res,json({ token });
    } catch (error) {
        res.status(500).json({ message: "Failed to login." });
    }
} );

module.exports = router;
