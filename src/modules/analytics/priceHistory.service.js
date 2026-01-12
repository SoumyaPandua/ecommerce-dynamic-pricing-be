import { PriceHistoryRepository } from "./priceHistory.repository.js";

export const PriceHistoryService = {
  async recordPriceChange({
    productId,
    oldPrice,
    newPrice,
    appliedRules,
    signals,
    triggeredBy = "SYSTEM",
  }) {
    if (oldPrice === newPrice) return null;

    return PriceHistoryRepository.create({
      productId,
      oldPrice,
      newPrice,
      appliedRules,
      signals,
      triggeredBy,
    });
  },

  async getProductHistory(productId) {
    return PriceHistoryRepository.findByProduct(productId);
  },

  async getProductAnalytics(productId) {
    const result =
      await PriceHistoryRepository.aggregateByProduct(
        productId
      );

    return result[0] || null;
  },
};