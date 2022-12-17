//require mongoose
const mongoose = require('mongoose')


//Create Post Schema
const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        default: 'Playdate'
    },
    image: {
        type: String,
    },
    cloudinaryId: {
        type: String,
        required: true,
    },
    caption: {
        type: String,
    },
    likes: {
        type: Number,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    friends1: {
        type: String,
    },
    grownups1: {
        type: String,
    },
    location1: {
        type: String
    }
})

module.exports = mongoose.model("Post", PostSchema)