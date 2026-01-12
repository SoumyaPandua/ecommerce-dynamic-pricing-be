import mongoose from "mongoose";

const pricingSchema = new mongoose.Schema(
  {
    basePrice: { type: Number, required: true },
    discountPrice: { type: Number },
    dynamicPrice: { type: Number, required: true },
    minPrice: { type: Number, required: true },
    maxPrice: { type: Number, required: true },
  },
  { _id: false }
);

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    status: {
      type: String,
      enum: ["ACTIVE", "INACTIVE"],
      default: "ACTIVE",
    },
    pricing: pricingSchema,
    deletedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);