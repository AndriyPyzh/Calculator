import mongoose from 'mongoose';

const {Schema} = mongoose;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minLength: 8,
        maxLength: 20
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
});

const Users = mongoose.model('users', UserSchema);

module.exports = {Users, UserSchema};
