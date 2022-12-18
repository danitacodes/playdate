//require mongoose, passport-local-mongoose
// const bcrypt = require('bcrypt');
const mongoose = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose')

//User Schema
const userSchema = new mongoose.Schema({
    username: String,
    password: String
});

//Password hash using passport-local
userSchema.plugin(passportLocalMongoose)

// UserSchema.pre("save", function save(next) {
//     const user = this;
//     if (!user.isModified("password")) {
//         return next();
//     }
//     bcrypt.genSalt(10, (err, salt) => {
//         if (err) {
//             return next(err);
//         }
//         bcrypt.hash(user.password, salt, (err, hash) => {
//             if (err) {
//                 return next(err);
//             }
//             user.password = hash;
//             next();
//         })
//     })
// })

//Password Validation Helper
// UserSchema.methods.comparePassword = function comparePassword (
//     candidatePassword,
//     cb
// ) {
//     brcypt.compare(candidatePassword, this.password, (err, isMatch) => {
//         cd(err, isMatch);
//     })
// }

module.exports = mongoose.model("User", userSchema);