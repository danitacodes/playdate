//require the packages
require('dotenv').config()
const express = require('express')
// const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const session = require('express-session')
const passport = require('passport')
const ejs = require('ejs')

//application setup
const app = express();

//EJS views, body-parser, express-static
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static('public'))

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
