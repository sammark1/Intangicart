/*NOTE THIS CONTROLLER IS USED FOR ROUTES, MODELS, AND VIEWS
RELATED TO THE USER PROFILE (NOT COLLECTION)*/

const db = require("../models");
const Users = require("../models/user");
const Products = require("../models/products");
const { User } = require("../models");
const { deleteOne } = require("../models/user");


const user = function (req,res) {
    Users.find({name:req.user.name},function(err,foundUser){
        if(err) res.send(err);
        Products.find({owner:foundUser[0]._id},function(err,userProducts){
            if(err) res.send(err);
            const context = {
                user2: req.user,
                Products: userProducts,
                User:foundUser,
                page:"user",
              Onpage: "userpage"
            }
            res.render("user/collection",context);
        })


    })
}

const newProduct = (req, res) => {
    // giving the new ejs template access to all products for reference
    db.Product.find({}, (err, foundProducts) => {
        if (err) res.send(err);

        const context = { Product: foundProducts, user2: req.user, Onpage: "userpage"};
        res.render("user/new", context)
    });
};
const create = function(req, res) { 
    db.Product.create(req.body, function(err, createdProducts) {
        if (err) res.send(err);
        db.User.findById(req.user).exec(function (err, foundUser) {
            if (err) res.send(err);
             foundUser.userCollection.push(createdProducts); 
            createdProducts.owner =foundUser;
           
            foundUser.save(); //saving the relationship to the database and commits to memory
            createdProducts.save();
            res.redirect("/user")
        });
    }
)};
//show function
const show = function(req, res) {
    db.Product.findById(req.params.id)
        .exec((err, foundProducts) => {
            if (err) res.send(err);
            const context = {  Product: foundProducts , user2: req.user, Onpage: "userpage"  };
            res.render("user/show", context)
        });
};
//index function
const idx = (req, res) => {
    db.Product.find({}, (err, foundProducts) => {
        if (err) res.send(err);
        const context = { Product: foundProducts, user2: req.user, Onpage: "productPage"};
        res.render("user/index", context)
    });
};
//edit product function
const edit = function(req, res){
    db.Product.findById(req.params.id, (err, foundProducts) => {
        if (err) res.send(err);
        const context = { Product: foundProducts, user2: req.user, Onpage: "userpage" }
        res.render("user/editPartial", context)
    });
};
// updat product function
const update = function(req, res) {
    db.Product.findByIdAndUpdate(
        req.params.id,
        { 
            name: req.body.name,
            price:req.body.price,
            image:req.body.image,
        },
        { new: true, returnOriginal: false },
    
        // callback function AFTER the update has completed
        (err, updatedProduct) => {
            if (err) res.send(err);
            res.redirect("/user");
        }
    );
}
// delete function for the selected product
const destroy = function (req,res){
    db.Product.findByIdAndDelete(req.params.id, function (err, deletedProduct){
        if (err) res.send(err);
        db.User.findById(deletedProduct.owner,function (err, foundOwner){
            if (err) res.send(err);
            foundOwner.userCollection.splice(foundOwner.userCollection.indexOf(deletedProduct),1);
            foundOwner.save();
        })
        res.redirect("/user");
    })
}
//delete function to remove the given user profile, Nice work by Sam!
const destroyUser = function (req,res){
    db.User.findByIdAndDelete(req.params.id, function (err, deletedUser){
        if (err) res.send(err);
        db.User.find({name:"Intangicart"},function(err,Intangicart){
            if (err) res.send(err);
            deletedUser.userCollection.forEach(element => {
                db.Product.findById(element,function(err,foundElement){
                    foundElement.owner=Intangicart[0];
                    foundElement.save();
                })
                Intangicart[0].userCollection.push(element);
            });
            Intangicart[0].save();
        })
        res.redirect("/logout");
    })
}
//update function to update the user profile 
const updateUSR = function (req,res){
    db.User.findByIdAndUpdate(
        req.user,
        {
            name:req.body.userName,
            userIcon:req.body.userIcon,
            userEmail:req.body.userEmail,
        },
        { new: true, returnOriginal: false },
        (err, updatedUser) => {
            if (err) res.send(err);
            res.redirect("/user");
        }
    )
}

module.exports = {
    user,
    newProduct,
    create,
    show,
    idx,
    edit,
    update,
    destroy,
    destroyUser,
    updateUSR,
}
