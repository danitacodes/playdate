//require mongoose
const mongoose = require('mongoose')


//Create Post Schema
const PostSchema = new mongoose.Schema({
    image: {
        type: String,
        default: "No Photo",
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
    friends: {
        type: String,
    },
    grownups: {
        type: String,
    },
    location: {
        type: String,
    }
})

module.exports = mongoose.model("Post", PostSchema)