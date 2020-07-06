const express = require("express");
const router = express.Router();

const verifyToken = require("../verifyToken");
const { fetchATMs } = require("../controllers/admin");
router.use(verifyToken);

router.get("/states", fetchATMs);
router.get("/regions", fetchATMs);

module.exports = router;
