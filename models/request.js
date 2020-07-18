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
    campaignType: {
      type: String,
      required: true,
    },
    customerName: String,
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
      default: "Internal",
    },
    status: {
      type: String,
      default: "Pending",
    },
    approveComment: String,
    declineComment: String,
    undoComment: String,
    selectedScreen: String,
    active: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Request", requestSchema);
