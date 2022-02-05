const mongoose = require("mongoose");
const User = require('./user');
const productSchema = new mongoose.Schema ({
    owner: {type: mongoose.Schema.Types.ObjectId, ref:'User'},
    listed: Boolean,
    name: String,
    price: Number,
    image: String,
    tag: String,
}, {
    timestamps: true,
})


module.exports = mongoose.model("Product", productSchema)