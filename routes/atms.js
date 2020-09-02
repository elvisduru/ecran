const express = require("express");
const router = express.Router();

const verifyToken = require("../verifyToken");
const { fetchATMs, checkAllATMs } = require("../controllers/admin");
router.use(verifyToken);

router.get("/states", fetchATMs);
router.get("/regions", fetchATMs);
router.get("/monitor", checkAllATMs);

module.exports = router;
