import mongoose from "mongoose";

const priceHistorySchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
      index: true,
    },
    oldPrice: {
      type: Number,
      required: true,
    },
    newPrice: {
      type: Number,
      required: true,
    },
    appliedRules: {
      type: [String], // rule names
      default: [],
    },
    signals: {
      demandScore: Number,
      stock: Number,
      marketPrice: Number,
    },
    triggeredBy: {
      type: String,
      enum: ["CRON", "MANUAL", "SYSTEM"],
      default: "SYSTEM",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "PriceHistory",
  priceHistorySchema
);