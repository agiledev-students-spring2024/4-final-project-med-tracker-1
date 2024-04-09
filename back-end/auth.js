const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

function generateToken(user) {
    return jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '24h' });
}

function authenticateToken(req, res, next) {
    const token = req.headers['authorization']?.split(' ')[1];  
    if (!token) return res.status(401).json({ message: "Access denied, no token provided." });

    try {
        const verified = jwt.verify(token, JWT_SECRET);
        req.user = verified;
        next();
    } catch (error) {
        res.status(400).json({ message: "Invalid Token" });
    }
}

async function hashPassword(password) {
    return await bcrypt.hash(password, 10);
}

async function validatePassword(plaintext, hash) {
    return await bcrypt.compare(plaintext, hash);
}

module.exports = { generateToken, authenticateToken, hashPassword, validatePassword };
