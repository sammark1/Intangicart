/*NOTE THIS CONTROLLER IS USED FOR ROUTES, MODELS, AND VIEWS
RELATED TO THE USER PROFILE (NOT COLLECTION)*/

const db = require("../models");

const user = (req,res) =>{
    res.render("user/collection", {
        user: db.landingMD.testDBLink(),
        user2: req.user
    })
}
const newProduct = (req, res) => {
    // giving the new ejs template access to all products for reference
    db.Product.find({}, (err, foundProducts) => {
        if (err) res.send(err);

        const context = { Product: foundProducts, user2: req.user};
        res.render("user/new", context)
    });
};
const create = function(req, res) { 
    db.Product.create(req.body, function(err, createdProducts) {
        //console.log("created product" + createdProducts);
        if (err) res.send(err);
        // allows us to add article to the author
        // .exec short for execute. similar to .then, after this query, exectute this one.
        db.User.findById(req.user).exec(function (err, foundUser) {
            if (err) res.send(err);
            // update the author articles array
             foundUser.userCollection.push(createdProducts); // adds article to author
            createdProducts.owner =foundUser;
           
            foundUser.save(); //saving the relationship to the database and commits to memory
            createdProducts.save();
            res.redirect("/")
        });
    }
)};

module.exports = {
    user,
    newProduct,
    create
}
