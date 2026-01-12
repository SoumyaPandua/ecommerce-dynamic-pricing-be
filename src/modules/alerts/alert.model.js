import mongoose from "mongoose";

const alertSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: [
        "PRICE_INCREASE",
        "PRICE_DECREASE",
        "LOW_STOCK",
        "OUT_OF_STOCK",
      ],
      required: true,
    },
    threshold: {
      type: Number, // % for price, qty for stock
    },
    channels: {
      type: [String],
      enum: ["EMAIL", "WEBHOOK"],
      default: ["EMAIL"],
    },
    enabled: {
      type: Boolean,
      default: true,
    },
    target: {
      type: String, // email or webhook URL
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Alert", alertSchema);