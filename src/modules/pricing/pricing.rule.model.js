import mongoose from "mongoose";

const pricingRuleSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    type: {
      type: String,
      enum: ["DEMAND", "INVENTORY", "COMPETITOR"],
      required: true,
    },
    condition: {
      field: String,      // e.g. demandScore, stock
      operator: String,   // >, <, >=
      value: Number,
    },
    action: {
      type: {
        type: String,
        enum: ["INCREASE_PERCENT", "DECREASE_PERCENT"],
      },
      value: Number, // percent
    },
    priority: { type: Number, default: 100 },
    enabled: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("PricingRule", pricingRuleSchema);