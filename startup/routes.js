import express from 'express';
import users from "../routes/users";

module.exports = function (app) {
    app.use(express.json());
    app.use(express.urlencoded({extended: true}));

    app.use('/users', users);

    // app.use(error);
};
