/*NOTE THIS CONTROLLER IS USED FOR ROUTES, MODELS, AND VIEWS
RELATED TO THE LANDING PAGE AND OAUTH*/

const db = require("../models");
const Products = require("../models/products")

const landing = (req, res) => {
    Products.find({},function(err,products){
        const context = {
            user2: req.user,
            Products: products,
            Onpage: "userpage" //Used for determining which Icon to show in the Nav bar for routing the user
        }
        res.render("landing",context);
    })
}

module.exports = {
    landing,
}