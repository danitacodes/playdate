const router = require('express').Router()

//Require Post Model
const Post = require('../models/Post')

//create routes
//get home
router.get('/', (req, res) => {
    //check if user logged in and redirect to post page
    if(req.isAuthenticated()){
        res.redirect('/playfeed')
    } else {
        res.render('index')
    }
})

//get register page
router.get('/register', (req, res) => {
    if(req.isAuthenticated()){
        res.redirect('/playfeed')
    }else{
        res.render('register')
    }
})

//Login page
router.get('/login', (req, res) => {
    if(req.isAuthenticated()){
        res.redirect('/playfeed')
    }else{
        res.render('/login')
    }
})

//get post page using data from DB
router.get('/posts', async(req, res) => {
    try {
        //fetch post from db
        const allPosts = await Post.find()
        res.render("posts", {allPosts, isAuth:req.isAuthenticated() })
    } catch (error) {
        res.send(error)
    }
})

//get Feed page
router.get('/playfeed', (req, res) => {
    //check if user logged in and redirect
    if(req.isAuthenticated()){
        res.render('/playfeed')
    }else{
        res.redirect('/register')
    }
})

//POST
//submit a post and add to DB
router.post('/post', async(req, res) => {
    try {
        //upload pic to cloudinary
        const result = await cloudinary.uploader.upload(req.file.path)

        await Post.create({
            title: req.body.title,
            image: result.secure_url,
            cloudinaryId: result.public_id,
            caption: req.body.caption,
            likes: 0,
            user: req.user.id,
            friends1: req.body.friends1,
            grownups1: req.body.grownups1,
            location1: req.body.locations1,
        })
        //save post in DB
        const savePost = post.save()
        //redirect to feed if successful
        res.redirect('/playfeed')
    } catch (error) {
        res.render(error)
    }
})

//Like playdate

//export
module.exports = router