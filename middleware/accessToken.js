const process = require('dotenv').config();
const jwt = require('jsonwebtoken');

// Middleware function to verify JWT token and check user
const verifyToken = () => (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1]

    if (!token) {
        return res.status(401).json({ message: 'Authorization token is missing' });
    }

    // try {
        console.log("token", token)

        const user = jwt.verify( token, process.parsed.SECRET_KEY);
        console.log("user", user)
        next();
    // } catch (error) {
    //     console.log('err', error)
    //     return res.status(401).json({ message: 'Invalid token' });
    // }
};

module.exports = { verifyToken };