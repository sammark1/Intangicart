const router = require('express').Router();
const ctrl = require('../controllers');

router.get("/user",ctrl.userCT.user);
router.post("/user/create",ctrl.userCT.create);
router.post("/user/update",ctrl.userCT.updateUSR);
//REVIEW for necessity
// router.get("/new",ctrl.userCT.newProduct);
// router.post("/landing", ctrl.userCT.create);
// router.get("/index", ctrl.userCT.idx);
// router.get("/:id", ctrl.userCT.show);
// router.post("/:id", ctrl.userCT.update);
router.get("/product/:id/edit", ctrl.userCT.edit);
router.put("/product/:id", ctrl.userCT.update);
router.delete("/user/delete/:id", ctrl.userCT.destroy);
router.delete("/user/deleteuser/:id", ctrl.userCT.destroyUser);


module.exports = router;