const mongoose = require("mongoose");
const userSchema = new mongoose.Schema ({
    googleId: String,
}, {
    timestamps: true,
})

module.exports = mongoose.model("testCollection", userSchema)