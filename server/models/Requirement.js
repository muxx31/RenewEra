const mongoose = require("mongoose");

const requirementSchema = new mongoose.Schema(
  {
    startupId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    startupName: {
      type: String,
      required: true,
      trim: true,
    },
    materialType: {
      type: String,
      required: true,
      trim: true,
    },
    minimumWeight: {
      type: Number,
      required: true,
    },
    additionalDetails: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Requirement", requirementSchema);
