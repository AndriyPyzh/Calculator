import express from 'express';
import users from "../routes/users";
import tasks from '../routes/tasks';

module.exports = function (app) {
    app.use(express.json());
    app.use(express.urlencoded({extended: true}));

    app.use('/users', users);
    app.use('/tasks', tasks)

    // app.use(error);
};
