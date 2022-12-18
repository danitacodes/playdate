//require the packages
require('dotenv').config()
const express = require('express')
const path = require('path')
const fs = require('fs')
// const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const session = require('express-session')
const passport = require('passport')
const MongoStore = require('connect-mongo')(session)
const flash = require("express-flash")
const logger = require('morgan')
const methodOverride = require('method-override')
const ejs = require('ejs')

//require routes
const mainRoutes = require('./routes/main')
const postRoute = require('./routes/posts')
const connectDB = require('./config/database')

//application setup
const app = express();

//EJS views, body-parser, express-static
app.set('view engine', 'ejs')
app.use(express.static("public"))

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

//Logging
app.use(logger('dev'))

//setup session
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
}))

//Passport Initialization
app.use(passport.initialize())

//use passport to deal with session
app.use(passport.session())

//Forms for put/delete
app.use(methodOverride('_method'))

//Connect to database
connectDB();
// mongoose.connect(process.env.DB_CONNECT)
// .then(() => console.log('Database connected'))
// .catch(err => console.log(err))

//flash messages
app.use(flash())

//Use routes

app.use('/', mainRoutes)



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