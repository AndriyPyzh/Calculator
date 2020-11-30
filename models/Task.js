import mongoose from 'mongoose';

const {Schema} = mongoose;

const TaskSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    matrix: {
        type: [[Number]],
        required: true,
    },
    vector: {
        type: [Number],
        required: true,
    },
    isPaused:{
        type:Boolean,
        default: false
    },
    isStopped:{
        type:Boolean,
        default: false
    },
    result: {
        type: [Number],
        required: false,
    },
    status: {
        type: String,
        enum: ['new', 'running', 'finished'],
        default: 'new'
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    startedAt: {
        type: Date,
        required: false
    },
    finishedAt: {
        type: Date,
        required: false
    },
    progress: {
        type: Number,
        range: [0, 100],
        default: 0
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
});

const Tasks = mongoose.model('tasks', TaskSchema);

module.exports = {Tasks, TaskSchema};
