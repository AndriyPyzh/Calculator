import bcrypt from 'bcrypt';
import {Users} from '../models/User';
import asyncHandler from 'express-async-handler';
import {StatusCodes} from "http-status-codes";

const registerUser = asyncHandler(async (req, res) => {
    const {username, password} = req.body;

    let user = await Users.findOne({username});

    if (user) {
        return res.status(StatusCodes.BAD_REQUEST).json('User already registered');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new Users({
        username,
        password: hashedPassword
    });

    await user.save();

    res.status(StatusCodes.CREATED).json("Successfully registered");
});

module.exports = {registerUser};
