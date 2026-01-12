import mongoose from "mongoose";

const competitorPriceSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
      index: true,
    },
    competitor: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    currency: {
      type: String,
      default: "INR",
    },
    source: {
      type: String,
      enum: ["MANUAL", "API", "SCRAPER"],
      default: "MANUAL",
    },
    fetchedAt: {
      type: Date,
      default: Date.now,
      index: true,
    },
  },
  { timestamps: true }
);

// One price per competitor per product
competitorPriceSchema.index(
  { productId: 1, competitor: 1 },
  { unique: true }
);

export default mongoose.model(
  "CompetitorPrice",
  competitorPriceSchema
);