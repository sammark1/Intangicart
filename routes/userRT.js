const router = require('express').Router();
const ctrl = require('../controllers');

router.get("/user",ctrl.userCT.user);
router.post("/user/create",ctrl.userCT.create)
//REVIEW for necessity
router.get("/new",ctrl.userCT.newProduct);
router.post("/landing", ctrl.userCT.create);
router.get("/index", ctrl.userCT.idx);
router.get("/:id", ctrl.userCT.show);
router.post("/:id", ctrl.userCT.update);
router.get("/:id/edit", ctrl.userCT.edit);
router.put("/:id", ctrl.userCT.update);


module.exports = router;