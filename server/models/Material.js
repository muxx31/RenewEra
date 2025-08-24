const mongoose = require("mongoose");

const materialSchema = new mongoose.Schema(
  {
    supplierId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    materialType: {
      type: String,
      required: true,
      trim: true,
    },
    weight: {
      type: Number,
      required: true,
    },
    freeOrPaid: {
      type: String,
      enum: ["free", "paid"],
      required: true,
    },
    additionalInfo: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Material", materialSchema);
