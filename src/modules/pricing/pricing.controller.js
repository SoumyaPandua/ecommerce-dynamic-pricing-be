import { PricingService } from "./pricing.service.js";

export const PricingController = {
  async recalculate(req, res) {
    const data =
      await PricingService.recalculatePrice(
        req.params.productId
      );

    res.json({ success: true, data });
  },
};