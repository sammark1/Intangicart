const mongoose = require("mongoose");
const userSchema = new mongoose.Schema ({
    googleId: String,
    name: String,
}, {
    timestamps: true,
})

module.exports = mongoose.model("User", userSchema, "testCollection")