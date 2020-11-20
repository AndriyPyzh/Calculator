import {StatusCodes} from 'http-status-codes'

module.exports = (err, req, res) => {

    console.log(err.message, err);

    res.status(err.status || StatusCodes.INTERNAL_SERVER_ERROR)
        .send(err.message || 'Something failed.');
};
