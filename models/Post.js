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
        require: true,
    },
    cloudinaryId: {
        type: String,
        required: true,
    },
    caption: {
        type: String,
        required: true,
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
    friends: {
        type: String,
        required: true,
    },
    grownups: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    }
})

module.exports = mongoose.model("Post", PostSchema)