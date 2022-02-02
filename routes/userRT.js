const router = require('express').Router();
const ctrl = require('../controllers');

router.get("/user",ctrl.userCT.user);

module.exports = router;