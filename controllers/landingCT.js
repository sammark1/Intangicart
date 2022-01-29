const db = require("../models");

const landing = (req, res) => {
    //NOTE match EJS
    res.render("landing", {
        landingTest: db.landingMD.getAll()
    })
}

module.exports = {
    landing
}