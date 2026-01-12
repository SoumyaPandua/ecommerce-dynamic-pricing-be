import { DemandService } from "./demand.service.js";

export const DemandController = {
  async record(req, res) {
    const { productId, eventType } = req.body;

    await DemandService.recordEvent(productId, eventType);

    res.status(204).send();
  },

  async getMetrics(req, res) {
    const data = await DemandService.getDemandMetrics(
      req.params.productId
    );

    res.json({ success: true, data });
  },
};