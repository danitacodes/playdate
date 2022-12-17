// require express router
const router = require('express').Router()
const passport = require('passport')

//User Model
const User = require('../models/User')

//Passport Local strategy
passport.use(User.createStrategy())

//Serialize and deserialize user
passport.serializeUser(function(user, doone) {
    doone(null, user.id)
})
passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user)
    })
})

//register user in MongoDB
router.post('/auth/register', async (req, res) => {
    try {
        //register user
        const registerUser = await User.register({username: req.body.username}, req.body.password)
        if(registerUser){
            passport.authenticate("local")(req, res, function(){
                res.redirect("/playfeed")
            })
        } else {
            res.redirect("/register")
        }
    } catch (error) {
        res.send(error)
    }
})

//Login User
router.post('/auth/login', (req, res) => {
    //create new user
    const user = new User({
        username: req.body.username,
        password: req.body.passport
    });

    //passport login credential check
    req.login(user, (err) => {
        if(err){
            console.log(err)
        } else {
            passport.authenticate("local")(req, res, function(){
                res.redirect("/posts")
            })
        }
    })
})

//Logout user
router.get("/auth/logout", (req, res)=> {
    //use passport logout
    req.logout()
    res.redirect('/')
})

//export router
module.exports = router
