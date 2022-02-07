/*NOTE THIS CONTROLLER IS USED FOR ROUTES, MODELS, AND VIEWS
RELATED TO THE LANDING PAGE AND OAUTH*/

const db = require("../models");
const Products = require("../models/products")

const landing = (req, res) => {
    Products.find({},function(err,products){
        const context = {
            user2: req.user,
            Products: products,
            Onpage: "userpage"
        }
        res.render("landing",context);
    })
    // res.render("landing", {
    //     user2: req.user,
    //     testItem:testboi,
    // });
}

module.exports = {
    landing,
}