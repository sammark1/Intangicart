/*NOTE THIS CONTROLLER IS USED FOR ROUTES, MODELS, AND VIEWS
RELATED TO THE LANDING PAGE AND OAUTH*/

const db = require("../models");

const landing = (req, res) => {
    //NOTE match EJS
    res.render("landing", {
        landingTest: db.landingMD.getAll()
    })
}
const shop = (req,res) => {
    res.render("shop/shop")
}

module.exports = {
    landing,
    shop
}