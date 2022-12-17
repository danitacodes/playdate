class authController {
    registerPage = (req, res) => {
        return res.render('register.ejs')
    }
    loginPage = (req, res) => {
        return res.render('login.ejs')
    }
}

module.exports = new authController()