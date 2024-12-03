const mongoose = require("mongoose");
const User = require("../Models/userModel");

const publicationSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    tags: {
        type: [String],
        required: true,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User,
        required: true,
    },
});

module.exports = mongoose.model("Publication", publicationSchema);