const cloudinary = require('../middleware/cloudinary')
const Post = require('../models/Post')
const Comment = require('../models/Comment')
const User = require('../models/User')

module.exports = {
    getProfile: async (req, res) => {
        try {
            const user = await User.findById(req.params.id);
            const posts = await Post.find({ user: req.user.id })
            res.render("profile.ejs", { posts: posts, publicUser: req.user, user: req.user})
            console.log(req.user)
        } catch (error) {
            console.log(error)
        }
    },
    getUserProfile: async (req, res) => {
        try {
            const user = await User.findById(req.params.id);
            const posts = await Post.find({ user: req.params.id });
            res.render("profile.ejs", { posts: posts, publicUser: user, user: req.user })
        } catch (error) {
            console.log(error)
        }
    },
    getPlayFeed: async (req, res) => {
        try {
            const posts = await Post.find().sort({ createdAt: "desc" }).populate({path: 'user', select: 'username'}).lean();
            res.render("playfeed.ejs", { posts: posts, username: req.user.username, user: req.user.id })
        } catch (error) {
           console.log(error) 
        }
    },
    getPost: async (req, res) => {
        try {
            const post = await Post.findById(req.params.id).populate('user');
            const comments = await Comment.find({ post: req.params.id }).sort({ createdAt: 'asc' }).populate('user').lean();
            res.render("post.ejs", { post: post, user: req.user.id, comments: comments, username: req.user.username });
            console.log(post._id)
        } catch (error) {
            console.log(error)
        }
    },
    createPost: async (req, res) => {
        try {
            //Upload image to cloudinary
            const result = await cloudinary.uploader.upload(req.file.path)

            await Post.
                create({
                    title: req.body.title,
                    image: result.secure_url,
                    cloudinaryId: result.public_id,
                    caption: req.body.caption,
                    likes: 0,
                    user: req.user.id,
                    playdate: req.body.playdate,
                    friends: req.body.friends,
                    grownups: req.body.grownups,
                    location: req.body.location
                })
                console.log("Post has been added")
                res.redirect('/playfeed')
        } catch (error) {
            console.log(error)
        }
    },
    likePost: async (req, res) => {
        try {
            await Post.findOneAndUpdate(
                { _id: req.params.id },
                { $inc: { likes: 1 },
            }
            );
            console.log("Likes +1");
            res.redirect(`/post/${req.params.id}`)
        } catch (error) {
            console.log(error)
        }
    },
    deletePost: async (req, res) => {
        try {
            //Find post by Id
            let post = await Post.findById({ _id: req.params.id });
            //Delete image from cloudinary
            await cloudinary.uploader.destroy(post.cloudinaryId);
            //delete post from database
            await Post.remove({ _id: req.params.id });
            console.log("Deleted Post")
            res.redirect("/profile")
        } catch (error) {
            res.redirect("/profile")
        }
    },
    getNewPlaydate: async (req, res) => {
        try {
            const user = await User.findById(req.params.id)
            const posts = await Post.find({ user: req.user.id })
            res.render("newPlaydate.ejs", { posts: posts, user: req.user })
        } catch (error) {
            console.log(error)
        }
    }
}

