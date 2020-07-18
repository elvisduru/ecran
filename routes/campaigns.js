const express = require("express");
const router = express.Router();
const verifyToken = require("../verifyToken");
const { Screen } = require("../models");
const { fetchScreens, updateScreen } = require("../controllers/admin");

router.use(verifyToken);

router.route("/").get(fetchScreens).put(updateScreen);

module.exports = router;
