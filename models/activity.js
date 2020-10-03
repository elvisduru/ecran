const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema(
  {
    role: String,
    user: String,
    ip: String,
    type: { type: String },
    resource: String,
    action: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("activity", activitySchema);
