const mongoose = require("mongoose");
const productSchema = new mongoose.Schema ({
    owner: [userSchema],
    listed: Boolean,
    name: String,
    price: Number,
    image: String,
    tag: String,
}, {
    timestamps: true,
})


module.exports = mongoose.model("Product", productSchema)