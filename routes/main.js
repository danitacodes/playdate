const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const homeController = require("../controllers/home");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Home Screen Route
router.get("/", homeController.getIndex);

//User routes

router.get("/login", authController.getLogin);
router.post("/login", authController.postLogin);
router.get("/logout", authController.logout);
router.get("/register", authController.getRegister);
router.post("/register", authController.postRegister);
router.put('/:id', ensureAuth, authController.updateUser);
router.delete('/:id', ensureAuth, authController.deleteUser);
router.get('/:id', ensureAuth, authController.findUser)
router.put('/:id/follow', ensureAuth, authController.followFriends)
router.put('/:id/follow', ensureAuth, authController.unfollowFriends)

module.exports = router;