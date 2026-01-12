import { Router } from "express";
import productRoutes from "../modules/product/product.routes.js";
import inventoryRoutes from "../modules/inventory/inventory.routes.js";
import demandRoutes from "../modules/demand/demand.routes.js";
import competitorRoutes from "../modules/competitor/competitor.routes.js";
import pricingRoutes from "../modules/pricing/pricing.routes.js";
import analyticsRoutes from "../modules/analytics/analytics.routes.js";
import alertRoutes from "../modules/alerts/alert.routes.js";
import healthRoutes from "./health.routes.js"

const router = Router();

router.use("/products", productRoutes);
router.use("/inventory", inventoryRoutes);
router.use("/demand", demandRoutes);
router.use("/competitors", competitorRoutes);
router.use("/pricing", pricingRoutes);
router.use("/analytics", analyticsRoutes);
router.use("/alerts", alertRoutes);
router.use("/health", healthRoutes);

export default router;