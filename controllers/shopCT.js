/*NOTE THIS CONTROLLER IS USED FOR ROUTES, MODELS, AND VIEWS
RELATED TO THE STORE AND COLLECTIONS*/

const db = require("../models");
const Products = require("../models/products")
//

// const shop = (req,res) => {
//     res.render("shop/shop",{user2: req.user})
// }
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
const purchase = function (req,res){
    db.Product.findById(req.params.id, function (err, purchaseProduct){
    if(err) res.send(err);
        db.User.findById(purchaseProduct.owner, function(err, updateOldOwner){
        updateOldOwner.userCollection.splice(updateOldOwner.userCollection.indexOf(purchaseProduct),1);
        updateOldOwner.wallet=updateOldOwner.wallet+purchaseProduct.price;
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
const confirm = function(req,res){  
    db.Product.findById(req.params.id)
        .exec((err, foundProducts) => {
            if (err) res.send(err);

            const context = {  Product: foundProducts, user2: req.user,Onpage: "userpage", };

            res.render("shop/confirm", context)
        });
}
// const purchase = function(req, res) {
//     db.Product.findByIdAndRemove(
//         req.params.id,
//         { 
//             $set: {
//            owner: req.body.owner
//             },
//          },
//         { new: true, returnOriginal: false },
    
//         // callback function AFTER the update has completed
//         function(err, updatedOwner) {
//             if (err) res.send(err);
            
//             console.log(updatedOwner)

//             res.redirect(`/user`);
//         }
//     );
// }


// const purchase = function (req,res){
//     db.Product.findById(req.params.id, function (err, sellingProduct){
//         if (err) res.send(err);
//         //console.log("owner", sellingProduct.owner);
//         db.User.findById(deletedProduct.owner,function (err, foundOwner){
//             if (err) res.send(err);
//             //console.log("found Owner: ",foundOwner);
//             foundOwner.userCollection.splice(foundOwner.userCollection.indexOf(deletedProduct),1);
//             foundOwner.save();
//         })
//         res.redirect("/user");
//     })
// }
//
module.exports = {
    shop,
    purchase,
    confirm
}
