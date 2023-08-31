import mongoose, { Schema } from "mongoose";

const Blog = new Schema({
    title: {
        type: String,
        required: true,
        unique: false
    },
    author: {
        type: Schema.Types.ObjectId,
        required: true,
        unique: false
    },
    content: {
        type: String,
        default: ""
    },
    tag: {
        type: String,
        default: "General"
    },
}, { timestamps: true });

export default mongoose.model('blogs', Blog);