//require the packages
require('dotenv').config()
const express = require('express')
const path = require('path')
const fs = require('fs')
// const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const session = require('express-session')
const passport = require('passport')
const ejs = require('ejs')

//require routes
const authRoute = require('./routes/auth')
const postRoute = require('./routes/posts')

//application setup
const app = express();

//EJS views, body-parser, express-static
app.set('view engine', 'ejs')
app.use(express.static("public"))

app.use(express.urlencoded({ extended: true }))
app.use(express.json())



//setup session
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
}))

//Passport Initialization
app.use(passport.initialize())

//use passport to deal with session
app.use(passport.session())

//Connect to database
mongoose.connect(process.env.DB_CONNECT)
.then(() => console.log('Database connected'))
.catch(err => console.log(err))

//Use routes
app.use('/', authRoute)
app.use('/', postRoute)

app.get("/", (req, res) => {
    res.render("index")
})

// app.get("/register", (req, res) => {
//     res.render("register")
// })

// app.get("/login", (req, res) => {
//     res.render("login")
// })

// app.get("/playfeed", (req, res) => {
//     res.render("playfeed")
// })

//Start the server
app.listen(process.env.PORT, () => console.log("Server running"))