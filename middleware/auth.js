const jwt = require('jsonwebtoken');
const HttpStatus = require('http-status-codes')
require('dotenv').config();

module.exports = async (req, res, next) => {

    // if (!process.env.AUTH_REQUIRED) return next();

    const token = req.header('x-auth-token');

    if (!token) {
        return res.status(HttpStatus.UNAUTHORIZED).send('Access denied, no token provided');
    }

    try {
        req.user = jwt.verify(token, process.env.ACCESS_TOKEN);
        next();
    } catch (e) {
        res.status(400).send('Invalid token.');
    }

};

