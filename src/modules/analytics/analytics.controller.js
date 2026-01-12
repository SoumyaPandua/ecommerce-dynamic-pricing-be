import { PriceHistoryService } from "./priceHistory.service.js";

export const AnalyticsController = {
  async priceHistory(req, res) {
    const data =
      await PriceHistoryService.getProductHistory(
        req.params.productId
      );

    res.json({ success: true, data });
  },

  async priceAnalytics(req, res) {
    const data =
      await PriceHistoryService.getProductAnalytics(
        req.params.productId
      );

    res.json({ success: true, data });
  },
};