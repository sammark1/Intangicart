/*NOTE THIS CONTROLLER IS USED FOR ROUTES, MODELS, AND VIEWS
RELATED TO THE USER PROFILE (NOT COLLECTION)*/

const db = require("../models");

const user = (req,res) =>{
    res.render("user/collection", {
        user: db.landingMD.testDBLink(),
        user2: req.user
    })
}

module.exports = {
    user
}