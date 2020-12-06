import asyncHandler from 'express-async-handler';
import {Tasks} from '../models/Task';
import {Users} from '../models/User';
import {runTask} from '../services/tasks';
import {StatusCodes} from "http-status-codes";

const createTask = asyncHandler(async (req, res) => {
    const {a,b,e,f,x} = req.body,
        user = req.user;

    const creator = await Users.findOne({username: user});
    const number = await Tasks.countDocuments();

    const task = new Tasks({
        name: `Task${number + 1}`,
        a,b,e,f,x,
        user: creator,
    });

    await task.save();

    runTask(task, creator);

    res.status(StatusCodes.CREATED).json(task);
});

const getTask = asyncHandler(async (req, res) => {
    const {name} = req.params,
        user = req.user;

    const creator = await Users.findOne({username: user});
    const task = await Tasks.findOne({name, user: creator});

    if (!task) {
        return res.status(StatusCodes.NOT_FOUND).json();
    }

    res.status(StatusCodes.OK).json(task);
});

const getRunningTasks = asyncHandler(async (req, res) => {
    const user = req.user;

    const creator = await Users.findOne({username: user});
    const tasks = await Tasks.find({user: creator, status: 'running'}).sort({ startedAt : -1});

    res.status(StatusCodes.OK).json(tasks);
});

const getFinishedTasks = asyncHandler(async (req, res) => {
    const user = req.user;

    const creator = await Users.findOne({username: user});
    const tasks = await Tasks.find({user: creator, status: 'finished'}).sort({ startedAt : -1});

    res.status(StatusCodes.OK).json(tasks);
});

const stopTask = asyncHandler(async (req, res) => {
    const {name} = req.params,
        user = req.user;
    console.log('hello');

    const creator = await Users.findOne({username: user});
    const task = await Tasks.findOne({name, user: creator});
    
    console.log(task);

    if (!task) {
        res.status(StatusCodes.NOT_FOUND).json();
    }
    
    console.log(JSON.stringify(task));

    task.isStopped = true;
    await task.save()

    res.status(StatusCodes.OK).json(task);
});


module.exports = {createTask, getRunningTasks, getFinishedTasks, getTask, stopTask};
