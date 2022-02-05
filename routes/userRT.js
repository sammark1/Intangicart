const router = require('express').Router();
const ctrl = require('../controllers');

router.get("/user",ctrl.userCT.user);
router.get("/new",ctrl.userCT.newProduct);
router.post("/landing", ctrl.userCT.create);


module.exports = router;