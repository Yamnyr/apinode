const mongoose = require("mongoose");
const User = require("../Models/userModel");

const recipeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    ingredients: {
        type: [String],
        required: true,
    },
    instructions: {
        type: String,
        required: true,
    },
    cuisineType: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User,
        required: true,
    },
});

module.exports = mongoose.model("Recipe", recipeSchema);
