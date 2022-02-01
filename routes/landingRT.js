const router = require('express').Router();
const ctrl = require('../controllers');
const passport = require("passport");

// router.get("/", function(req, res){
//     res.redirect("/landing");
// });
router.get("/", function(req,res){
    res.render("landing", {
        user2: req.user,
        
    });
});

router.get("/shop", function(req,res){
    console.log(req.user)
    res.render("shop", {
        user2: req.user,
    });
});

 router.get("/landing", ctrl.landingCT.landing)
 //router.get("/shop", ctrl.landingCT.landing)
 

// Google OAuth login route
router.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
  );

router.get(
    "/oauth2callback",
    passport.authenticate("google", {
      successRedirect: "/shop",
      failureRedirect: "/",
    })
  );
  router.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
  });

module.exports = router;