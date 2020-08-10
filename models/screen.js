const mongoose = require("mongoose");

const screenSchema = new mongoose.Schema(
  {
    title: String,
    src: { type: String, required: true },
    type: { type: String, required: true },
    request: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Request",
    },
    status: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Screen", screenSchema);
