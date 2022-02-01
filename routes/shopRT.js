const router = require('express').Router();
const ctrl = require('../controllers');

router.get("/shop", ctrl.shopCT.shop);

module.exports = router;