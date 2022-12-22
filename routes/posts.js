const express = require("express")
const router = express.Router()
const upload = require('../middleware/multer')
const postsController = require('../controllers/posts')
const { ensureAuth, ensureGuest } = require('../middleware/auth')

//Routes
router.get('/:id', ensureAuth, postsController.getPost)

router.post('/createPost', upload.single('file'), postsController.createPost)

router.put('/likePost/:id', postsController.likePost)

router.delete('/deletePost/:id', postsController.deletePost)

router.get('/allpost', ensureAuth, postsController.getPosts)

module.exports = router