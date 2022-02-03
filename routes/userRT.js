const router = require('express').Router();
const ctrl = require('../controllers');

router.get("/user",ctrl.userCT.user);
router.get("/new",ctrl.userCT.newProduct);


module.exports = router;