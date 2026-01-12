import { CompetitorRepository } from "./competitor.repository.js";
import { ApiError } from "../../common/errors/ApiError.js";

export const CompetitorService = {
  async upsertPrice(payload) {
    return CompetitorRepository.upsert(payload);
  },

  async getPrices(productId) {
    const prices =
      await CompetitorRepository.findByProduct(productId);

    if (!prices.length) {
      throw new ApiError(
        404,
        "No competitor prices found",
        "NO_COMPETITOR_DATA"
      );
    }

    return prices;
  },

  async getMarketSnapshot(productId) {
    const prices =
      await CompetitorRepository.findFreshByProduct(
        productId,
        60
      );

    if (!prices.length) {
      return {
        productId,
        marketPrice: null,
        competitors: [],
      };
    }

    const sorted = prices
      .map((p) => p.price)
      .sort((a, b) => a - b);

    const median =
      sorted.length % 2 === 0
        ? (sorted[sorted.length / 2 - 1] +
            sorted[sorted.length / 2]) /
          2
        : sorted[Math.floor(sorted.length / 2)];

    return {
      productId,
      marketPrice: median,
      competitors: prices,
    };
  },
};