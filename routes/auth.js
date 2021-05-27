const express = require("express");
const authController = require("../controllers/auth.js");

const router = express.Router();

router.post("/signin", authController.postSignin);
router.post("/signup", authController.postSignup);

module.exports = router;
