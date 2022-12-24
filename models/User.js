//require mongoose, passport-local-mongoose
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

//User Schema
const UserSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  email: { type: String, unique: true },
  password: String,
  profilePic: { type: String, default: "" },
  coverPic: { type: String, default: "" },
  followers: { type: Array, default: [] },
  following: { type: Array, default: [] },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  city:{
    type:String, max:50
  }
});

UserSchema.pre("save", function save(next) {
  const user = this;
  if (!user.isModified("password")) {
    return next();
  }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) {
        return next(err);
      }
      user.password = hash;
      next();
    });
  });
});

//Password Validation Helper
UserSchema.methods.comparePassword = function comparePassword(
  candidatePassword,
  cb
) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    cb(err, isMatch);
  });
};

module.exports = mongoose.model("User", UserSchema);
