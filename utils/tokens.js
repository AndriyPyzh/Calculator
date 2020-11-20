const jwt = require('jsonwebtoken');
require('dotenv').config();

const generateAccessToken = payload => {
    return jwt.sign(payload, process.env.ACCESS_TOKEN);
};

const generateRefreshToken = payload => {
    return jwt.sign(payload, process.env.REFRESH_TOKEN);
};

const generateEmailToken = payload => {
    return jwt.sign(payload, process.env.EMAIL_TOKEN);
};

module.exports = {
    generateAccessToken,
    generateRefreshToken,
    generateEmailToken
};
