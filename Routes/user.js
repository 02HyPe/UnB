const express = require(`express`);
const userController = require(`../Controllers/user`);
const router = express.Router();

router.get("/allUser", userController.alluser);

module.exports = router;