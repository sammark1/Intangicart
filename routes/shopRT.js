const router = require('express').Router();
const ctrl = require('../controllers');

router.get("/shop", ctrl.shopCT.shop);
router.post("/user", ctrl.shopCT.purchase);
router.put("/:id", ctrl.shopCT.purchase);
router.get("/:id/confirm", ctrl.shopCT.confirm);

module.exports = router;