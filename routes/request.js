const express = require("express");
const router = express.Router();
const verifyToken = require("../verifyToken");
const { addRequest, fetchRequests } = require("../controllers/admin");
router.use(verifyToken);

router.route("/new").post(addRequest);

router.route("/").get(fetchRequests);

module.exports = router;
