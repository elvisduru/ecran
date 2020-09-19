const express = require("express");
const router = express.Router();

const verifyToken = require("../verifyToken");
const { fetchATMs, checkAllATMs, updateATMs } = require("../controllers/admin");
router.use(verifyToken);

router.get("/states", fetchATMs);
router.get("/regions", fetchATMs);
router.get("/monitor", checkAllATMs);
router.put("/", updateATMs);

module.exports = router;
