/*NOTE THIS CONTROLLER IS USED FOR ROUTES, MODELS, AND VIEWS
RELATED TO THE STORE AND COLLECTIONS*/

const db = require("../models");
const Products = require("../models/products")

const shop = (req, res) => {
    Products.find({owner:{$nin:req.user._id}},function(err,products){
        const context = {
            user2: req.user,
            Products: products,
            Onpage: "productPage",
        }
        res.render("shop/shop",context);
    })

}
//What happens to the product, when the user confirms their purchase
const purchase = function (req,res){
    db.Product.findById(req.params.id, function (err, purchaseProduct){
    if(err) res.send(err);
        //The current product owner is found, and the product is removed from their collection, wallet is also updated to reflect the sale for the old owner
        db.User.findById(purchaseProduct.owner, function(err, updateOldOwner){
        updateOldOwner.userCollection.splice(updateOldOwner.userCollection.indexOf(purchaseProduct),1);
        updateOldOwner.wallet=updateOldOwner.wallet+purchaseProduct.price;

        //the purchaser is found via req.user and the new owner receives the purchased product in their collection, and the owner field in the product is updated to reflect the new owner, also the purchasers wallet is updated to reflect their new balance after the purchase

            db.User.findById(req.user).exec(function (err, updateNewOwner) {
            if (err) res.send(err);
             updateNewOwner.userCollection.push(purchaseProduct); 
            purchaseProduct.owner= updateNewOwner;
            updateNewOwner.wallet=updateNewOwner.wallet-purchaseProduct.price;
        
        purchaseProduct.save(); 
        updateOldOwner.save();
        updateNewOwner.save();   
        })
        res.redirect("/user");  
    })   
})
}
//confirming the purchase of a product 
const confirm = function(req,res){  
    db.Product.findById(req.params.id)
        .exec((err, foundProducts) => {
            if (err) res.send(err);

            const context = {  Product: foundProducts, user2: req.user,Onpage: "userpage", };

            res.render("shop/confirm", context)
        });
}

module.exports = {
    shop,
    purchase,
    confirm
}
