const mongoose = require("mongoose");
const userSchema = new mongoose.Schema ({
    name: String,
    googleId: String,
    userIcon: String,
    aboutMe: String,
    collection: [productSchema],
}, {
    timestamps: true,
})


module.exports = mongoose.model("User", userSchema)