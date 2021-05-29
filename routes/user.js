const express = require("express");
const userController = require("../controllers/user.js");

const router = express.Router();

router.get("/:email", userController.getUserInfo);
router.get("/account/:email", userController.getAccount); // smua house yg di advertise
router.post("/insertHouse", userController.postHouse);
router.delete("/account/:id", userController.deleteOwnedHouse);

module.exports = router;
