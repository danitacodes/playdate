const express = require('express')
const router = express.Router()
const homeController = require('../controllers/home')
const authController = require('../controllers/auth')
const postsController = require('../controllers/posts')
const { ensureAuth, ensureGuest } = require('../middleware/auth')

router.get('/', homeController.getIndex)

//Users
router.get('/register', authController.getRegister)
router.post('/register', authController.postRegister)
router.get('/logout', authController.logout)
router.get('/login', authController.getLogin)
router.post('/login', authController.postLogin)

//Playfeed
router.get('/playfeed', ensureAuth, postsController.getPlayFeed)

//Create Playdate
router.get('/newPlaydate', ensureAuth, postsController.getNewPlaydate)

//Profile
router.get('/profile', ensureAuth, postsController.getProfile)

module.exports = router