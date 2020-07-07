const express = require("express");
const router = express.Router();
const verifyToken = require("../verifyToken");
const {
  addRequest,
  fetchRequests,
  updateRequest,
} = require("../controllers/admin");
router.use(verifyToken);

router.route("/").get(fetchRequests).put(updateRequest);
router.route("/new").post(addRequest);

module.exports = router;
