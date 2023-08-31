import mongoose, { Schema } from "mongoose";

const User = new Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    blogs: {
        type: Array,
        default: []
    },
    bio: {
        type: String,
        default: ""
    },
    followers: {
        type: Array,
        default: []
    },
    following: {
        type: Array,
        default: []
    }
}, { timestamps: true });

export default mongoose.model('users', User);