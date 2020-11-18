import bcrypt from 'bcrypt';
import asyncHandler from 'express-async-handler';
import {Users} from '../models/User';
import {generateAccessToken} from '../utils/tokens';
import {StatusCodes} from 'http-status-codes';

const loginUser = asyncHandler(async (req, res) => {
    const {username, password} = req.body;

    const user = await Users.findOne({username});

    if (!user) {
        return res.status(StatusCodes.BAD_REQUEST).send('Invalid email or password');
    }

    const comparePassword = await bcrypt.compare(password, user.password);

    if (!comparePassword) {
        return res.status(StatusCodes.BAD_REQUEST).send('Invalid email or password');
    }

    const token = generateAccessToken(username);

    res.send({token});
});

module.exports.loginUser = loginUser;
