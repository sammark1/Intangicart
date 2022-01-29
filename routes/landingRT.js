const router = require('express').Router();
const ctrl = require('../controllers');

router.get("/", function(req, res){
    res.redirect("/landing");
});
router.get("/landing", ctrl.landingCT.landing)

module.exports = router;