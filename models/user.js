const mongoose = require("mongoose");
const userSchema = new mongoose.Schema ({
   _id: mongoose.Schema.Types.ObjectId,
    name: String,
    googleId: String,
    userIcon: String,
    aboutMe: String,
    collection: [{type: mongoose.Schema.Types.ObjectId, ref:'Product'}],
}, {
    timestamps: true,
})


module.exports = mongoose.model("User", userSchema)