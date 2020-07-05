const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema(
  {
    requesterName: {
      type: String,
      required: true,
    },
    campaignName: {
      type: String,
      required: true,
    },
    approval: {
      type: Boolean,
      default: false,
    },
    approvalDocument: String,
    campaignScreen: {
      type: String,
      required: true,
    },
    atmSelect: {
      type: String,
      required: true,
    },
    atmSelectRegion: [String],
    atmSelectStates: [String],
    dateRange: [Date],
    requestType: {
      type: String,
      default: "internal",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Request", requestSchema);
