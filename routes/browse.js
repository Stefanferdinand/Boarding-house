const express = require("express");
const browseController = require("../controllers/browse.js");

const router = express.Router();

router.get("/", browseController.getBrowse);

module.exports = router;
