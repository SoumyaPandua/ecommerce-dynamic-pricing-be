import { redlock } from "../common/utils/redisLock.js";
import Product from "../modules/product/product.model.js";
import { PricingService } from "../modules/pricing/pricing.service.js";
import logger from "../config/logger.js";

export const runPriceRecalculationJob = async () => {
  let lock;

  try {
    lock = await redlock.acquire(
      ["locks:price-recalculation"],
      10 * 60 * 1000 // 10 minutes
    );

    logger.info("🔒 Pricing job lock acquired");

    const products = await Product.find({
      deletedAt: null,
      status: "ACTIVE",
    }).select("_id");

    for (const product of products) {
      try {
        await PricingService.recalculatePrice(
          product._id,
          "CRON"
        );
      } catch (err) {
        logger.error(
          `Pricing failed for product ${product._id}`,
          err
        );
      }
    }
  } catch (err) {
    logger.warn("Pricing job skipped (lock exists)");
  } finally {
    if (lock) await lock.release();
  }
};