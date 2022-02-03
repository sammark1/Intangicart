/*NOTE THIS CONTROLLER IS USED FOR ROUTES, MODELS, AND VIEWS
RELATED TO THE STORE AND COLLECTIONS*/

const db = require("../models");
//
const shop = (req,res) => {
    res.render("shop/shop")
}
//
module.exports = {
    shop
}