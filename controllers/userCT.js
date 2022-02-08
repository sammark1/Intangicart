/*NOTE THIS CONTROLLER IS USED FOR ROUTES, MODELS, AND VIEWS
RELATED TO THE USER PROFILE (NOT COLLECTION)*/

const db = require("../models");
//FIXME Sam, the below two lines are unnecessary. just use db.User or db.Product.
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
            //console.log(userProducts)
            res.render("user/collection",context);
        })


    })
}
// const user = function (req,res) {
//     Products.find({},function(err,products){
//         Users.find({name:req.user.name},function(err,foundUser){
//             if(err){return res.redirect("/")}
//             const context = {
//                 user2: req.user,
//                 Products: products,
//                 User:foundUser,
//             }
//             console.log(foundUser)
//             res.render("user/collection",context);
//         })
//     })
// }
// const user = function (req,res) {
//     Products.find({},function(err,products){
//         const context = {
//             user2: req.user,
//             Products: products,
//         }
//         res.render("user/collection",context);
//         console.log(req.user);
//     })
// }

// const user = (req,res) =>{
//     res.render("user/collection", {
//         user2: req.user,
//         products: Products,
//     })
// }
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
        //console.log("created product" + createdProducts);
        if (err) res.send(err);
        // allows us to add article to the author
        // .exec short for execute. similar to .then, after this query, exectute this one.
        db.User.findById(req.user).exec(function (err, foundUser) {
            if (err) res.send(err);
             foundUser.userCollection.push(createdProducts); // adds article to author
            createdProducts.owner =foundUser;
           
            foundUser.save(); //saving the relationship to the database and commits to memory
            createdProducts.save();
            res.redirect("/user")
        });
    }
)};
const show = function(req, res) {
    db.Product.findById(req.params.id)
    // turns ids into the data from their model
        //.populate("products")
        // functioning like db.Author.findById()
        // allowing us to reference documents in other collections by automatically replacing the specified path/"field" in the document(s) from other collections
        .exec((err, foundProducts) => {
            if (err) res.send(err);


            const context = {  Product: foundProducts , user2: req.user, Onpage: "userpage"  };

            res.render("user/show", context)
        });
};
const idx = (req, res) => {
    db.Product.find({}, (err, foundProducts) => {
        if (err) res.send(err);

        const context = { Product: foundProducts, user2: req.user, Onpage: "productPage"};

        res.render("user/index", context)
    });
};

const edit = function(req, res){
    console.log(req.params.id)
    db.Product.findById(req.params.id, (err, foundProducts) => {
       
        if (err) res.send(err);


        const context = { Product: foundProducts, user2: req.user, Onpage: "userpage" }



        res.render("user/editPartial", context)
    });
};
const update = function(req, res) {
    console.log("////////////////////////////////////body:",req.body)
    db.Product.findByIdAndUpdate(
        req.params.id,
        { 
            listed: Boolean(req.body.listed),
            name: req.body.name,
            price:req.body.price,
            image:req.body.image,
        },
        { new: true, returnOriginal: false },
    
        // callback function AFTER the update has completed
        (err, updatedProduct) => {
            if (err) res.send(err);

            //res.redirect(`/${updatedProduct._id}`);
            res.redirect("/user");
        }
    );
}

const destroy = function (req,res){
    db.Product.findByIdAndDelete(req.params.id, function (err, deletedProduct){
        if (err) res.send(err);
        //console.log("owner",deletedProduct.owner);
        db.User.findById(deletedProduct.owner,function (err, foundOwner){
            if (err) res.send(err);
            //console.log("found Owner: ",foundOwner);
            foundOwner.userCollection.splice(foundOwner.userCollection.indexOf(deletedProduct),1);
            foundOwner.save();
        })
        res.redirect("/user");
    })
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
}
