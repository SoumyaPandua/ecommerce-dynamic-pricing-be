import PricingRule from "./pricing.rule.model.js";
import { PricingEngine } from "./pricing.engine.js";
import Product from "../product/product.model.js";
import Inventory from "../inventory/inventory.model.js";
import { DemandService } from "../demand/demand.service.js";
import { CompetitorService } from "../competitor/competitor.service.js";
import { PriceHistoryService } from "../analytics/priceHistory.service.js";
import { AlertService } from "../alerts/alert.service.js";
import { ApiError } from "../../common/errors/ApiError.js";

export const PricingService = {
  async recalculatePrice(productId, triggeredBy = "SYSTEM") {
    // 1️⃣ Fetch product
    const product = await Product.findById(productId);
    if (!product || product.deletedAt) {
      throw new ApiError(
        404,
        "Product not found",
        "PRODUCT_NOT_FOUND"
      );
    }

    // 2️⃣ Fetch signals
    const inventory = await Inventory.findOne({ productId });
    const demand = await DemandService.getDemandMetrics(productId);
    const market =
      await CompetitorService.getMarketSnapshot(productId);

    // 3️⃣ Determine base price
    const basePrice =
      product.pricing.discountPrice ??
      product.pricing.basePrice;

    const signals = {
      demandScore: demand?.demandScore ?? 0,
      stock: inventory?.stock ?? 0,
      marketPrice: market?.marketPrice ?? basePrice,
    };

    // 4️⃣ Load active pricing rules (priority-based)
    const rules = await PricingRule.find({ enabled: true })
      .sort({ priority: 1 });

    // 5️⃣ Apply pricing rules
    const { price, appliedRules } =
      PricingEngine.applyRules({
        basePrice,
        rules,
        signals,
      });

    // 6️⃣ Enforce safeguards (min/max)
    const safeguardedPrice = Math.min(
      Math.max(price, product.pricing.minPrice),
      product.pricing.maxPrice
    );

    const finalPrice = Math.round(safeguardedPrice);
    const oldPrice = product.pricing.dynamicPrice;

    // 7️⃣ Persist new price
    product.pricing.dynamicPrice = finalPrice;
    await product.save();

    // 8️⃣ Record immutable price history
    await PriceHistoryService.recordPriceChange({
      productId,
      oldPrice,
      newPrice: finalPrice,
      appliedRules,
      signals,
      triggeredBy,
    });

    // 9️⃣ Trigger price alerts (ASYNC SAFE)
    await AlertService.priceChanged({
      productId,
      oldPrice,
      newPrice: finalPrice,
    });

    // 🔟 Return response
    return {
      productId,
      oldPrice,
      newPrice: finalPrice,
      appliedRules,
      signals,
    };
  },
};