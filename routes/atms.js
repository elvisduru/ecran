const express = require("express");
const router = express.Router();

const verifyToken = require("../verifyToken");
const { fetchATMs, checkScreens } = require("../controllers/admin");
router.use(verifyToken);

router.get("/states", fetchATMs);
router.get("/regions", fetchATMs);
router.get("/monitor", checkScreens);

module.exports = router;
