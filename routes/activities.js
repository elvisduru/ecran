const express = require("express");
const router = express.Router();

const verifyToken = require("../verifyToken");
const { fetchActivities } = require("../controllers/admin");
router.use(verifyToken);

router.get("/", fetchActivities);

module.exports = router;
