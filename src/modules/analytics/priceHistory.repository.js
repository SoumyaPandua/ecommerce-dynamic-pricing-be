import mongoose from "mongoose";
import PriceHistory from "./priceHistory.model.js";

export const PriceHistoryRepository = {
  create(data) {
    return PriceHistory.create(data);
  },

  findByProduct(productId, limit = 50) {
    return PriceHistory.find({ productId })
      .sort({ createdAt: -1 })
      .limit(limit);
  },

  aggregateByProduct(productId) {
    return PriceHistory.aggregate([
      {
        $match: {
          productId: new mongoose.Types.ObjectId(productId),
        },
      },
      {
        $group: {
          _id: "$productId",
          avgPrice: { $avg: "$newPrice" },
          maxPrice: { $max: "$newPrice" },
          minPrice: { $min: "$newPrice" },
          changes: { $sum: 1 },
        },
      },
    ]);
  },
};