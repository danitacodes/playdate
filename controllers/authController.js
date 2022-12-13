class authController {
    registerPage = (req, res) => {
        return res.render('register.ejs')
    }
}

module.exports = new authController()