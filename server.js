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
// const authRoute = require('./routes/authRoute')

//application setup
const app = express();

//EJS views, body-parser, express-static
app.set('view engine', 'ejs')
app.use(express.static("public"))
// app.use('/', authRoute)
fs.readdirSync(`${__dirname}/routes`).map(filename => {
    app.use(
        '/',
        require(path.join(`${__dirname}`, '/routes', `${filename}`).
        replace('.js', ''))
    )
})
// app.use('/static', express.static(path.join(__dirname, 'public')))
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

app.get("/", (req, res) => {
    res.render("index")
})

app.get("/register", (req, res) => {
    res.render("register")
})

app.get("/login", (req, res) => {
    res.render("login")
})

//Start the server
app.listen(process.env.PORT, () => console.log("Server running"))