const mongoose = require("mongoose");
const Product = require('./products');
const userSchema = new mongoose.Schema ({
    name: String,
    googleId: String,
    userIcon: String,
    aboutMe: String,
    userEmail: String,
    tag: {type:String , default: "banana"},
    userCollection: [{type: mongoose.Schema.Types.ObjectId, ref:'Product'}],
}, {
    timestamps: true,
})

const User = mongoose.model("User", userSchema)
module.exports = User