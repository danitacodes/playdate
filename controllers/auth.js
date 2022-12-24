//require packages
const passport = require("passport");
const validator = require("validator");

//User model
const User = require("../models/User");

exports.getRegister = (req, res) => {
  if (req.user) {
    return res.redirect("/profile");
  }
  res.render("register", {
    title: "Create Account",
  });
};

exports.followFriends = async (req, res) => {
  if(req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id)
      const currentUser = await User.findById(req.body.userId)
      if(!user.followers.includes(req.body.userId)){
        await user.updateOne({ $push: { followers: req.body.userId } })
        await currentUser.updateOne({ $push: { following: req.params.id } })
        res.status(200).json("You are now following them")
      } else {
        res.status(403).json('You already follow them')
      }
    } catch (error) {
      
    }
  } else{
    res.status(400).json("You can't follow yourself")
  }
}

exports.unfollowFriends = async (req, res) => {
  if(req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id)
      const currentUser = await User.findById(req.body.userId)
      if(user.followers.includes(req.body.userId)){
        await user.updateOne({ $pull: { followers: req.body.userId } })
        await currentUser.updateOne({ $pull: { following: req.params.id } })
        res.status(200).json("You are not following them")
      } else {
        res.status(403).json('You already unfollow them')
      }
    } catch (error) {
      
    }
  } else{
    res.status(400).json("You can't unfollow yourself")
  }
}

exports.postRegister = (req, res, next) => {
  const validationErrors = [];
  if (!validator.isEmail(req.body.email))
    validationErrors.push({ msg: "Please enter a valid email address" });
  if (!validator.isLength(req.body.password, { min: 8 }))
    validationErrors.push({
      msg: "Password must be at least 8 characters long",
    });
  if (req.body.password !== req.body.confirmPassword)
    validationErrors.push({ msg: "Passwords do not match" });

  if (validationErrors.length) {
    req.flash("errors", validationErrors);
    return res.redirect("register");
  }
  req.body.email = validator.normalizeEmail(req.body.email, {
    gmail_remove_dots: false,
  });

  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  });

  User.findOne(
    { $or: [{ email: req.body.email }, { username: req.body.username }] },
    (err, existingUser) => {
      if (err) {
        return next(err);
      }
      if (existingUser) {
        req.flash("errors", {
          msg: "Account with that email address or username already exists.",
        });
        return res.redirect("../register");
      }
      user.save((err) => {
        if (err) {
          return next(err);
        }
        req.logIn(user, (err) => {
          if (err) {
            return next(err);
          }
          res.redirect("/profile");
        });
      });
    }
  );
};

exports.getLogin = (req, res) => {
  if (req.user) {
    return res.redirect("/profile");
  }
  res.render("login", {
    title: "Login",
  });
};

exports.postLogin = (req, res, next) => {
  const validationErrors = [];
  if (!validator.isEmail(req.body.email))
    validationErrors.push({ msg: "Please enter a valid email address." });
  if (validator.isEmpty(req.body.password))
    validationErrors.push({ msg: "Password cannot be blank." });

  if (validationErrors.length) {
    req.flash("errors", validationErrors);
    return res.redirect("/login");
  }
  req.body.email = validator.normalizeEmail(req.body.email, {
    gmail_remove_dots: false,
  });

  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      req.flash("errors", info);
      return res.redirect("/login");
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      req.flash("success", { msg: "You are logged in." });
      res.redirect(req.session.returnTo || "/profile");
    });
  })(req, res, next);
};

exports.logout = (req, res) => {
  req.logout(() => {
    console.log("User logged out.");
  });
  req.session.destroy((err) => {
    if (err) console.log("Error: Failed to destroy the sesstion", err);
    req.user = null;
    res.redirect("/");
  });
};

exports.updateUser = async (req, res) => {
  if(req.body.userId === req.params.id || req.body.isAdmin){
    if(req.body.password){
      try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt)
      } catch (error) {
        console.log(error)
      }
    }
    try {
      const user = await User.findByIdAndUpdate(req.params.id, {$set:req.body})
      res.status(200).json("Account has been updated")
    } catch (error) {
      console.log(error)
    }
  } else {
    return res.redirect('/login')
  }
}

exports.deleteUser = async (req, res) => {
  if(req.body.userId === req.params.id || req.body.isAdmin){
  
    try {
      const user = await User.findByIdAndDelete(req.params.id)
      res.status(200).json("Account has been deleted")
    } catch (error) {
      console.log(error)
    }
  } else {
    return res.redirect('/login')
  }
}

exports.findUser = async (req, res) => {
  try {
    const user= await User.findById(req.params.id);
    const {password, ...other} = user._doc
    res.status(200).json(user)
  } catch (error) {
    console.log(error)
  }
}