import express from 'express';
import {createTask, getFinishedTasks, getRunningTasks, getTask, stopTask} from '../controllers/tasks';
import auth from "../middleware/auth";

const router = express.Router();

router.route('/').post(auth, createTask);
router.route('/finished').get(auth, getFinishedTasks);
router.route('/running').get(auth, getRunningTasks);
router.route('/:name').get(auth, getTask);
router.route('/:name/stop').patch(auth, stopTask);

module.exports = router;
