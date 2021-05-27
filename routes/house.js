const express = require("express");
const houseController = require("../controllers/house.js");

const router = express.Router();

router.get("/:id", houseController.getHouseDetails);
router.post("/", houseController.postOrder);

module.exports = router;
