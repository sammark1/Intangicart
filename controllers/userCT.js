/*NOTE THIS CONTROLLER IS USED FOR ROUTES, MODELS, AND VIEWS
RELATED TO THE USER PROFILE (NOT COLLECTION)*/

const db = require("../models");

const user = (req,res) =>{
    res.render("user/collection", {
        user: db.landingMD.testDBLink(),
    })
}
const newProduct = (req, res) => {
    // giving the new ejs template access to all authors for article reference
    db.Product.find({}, (err, foundProducts) => {
        if (err) res.send(err);

        const context = { Product: foundProducts };
        res.render("user/new", context)
    });
};

module.exports = {
    user,
    newProduct
}