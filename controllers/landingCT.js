const db = require("../models");

const landing = (req, res) => {
    //NOTE match EJS
    res.render("landing")
}

module.exports = {
    landing
}