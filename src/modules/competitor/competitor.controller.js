import { CompetitorService } from "./competitor.service.js";

export const CompetitorController = {
  async upsert(req, res) {
    const data = await CompetitorService.upsertPrice(req.body);
    res.json({ success: true, data });
  },

  async getAll(req, res) {
    const data = await CompetitorService.getPrices(
      req.params.productId
    );
    res.json({ success: true, data });
  },

  async snapshot(req, res) {
    const data =
      await CompetitorService.getMarketSnapshot(
        req.params.productId
      );
    res.json({ success: true, data });
  },
};