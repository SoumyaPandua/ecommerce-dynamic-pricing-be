import { Router } from "express";
import { AnalyticsController } from "./analytics.controller.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Analytics
 *   description: Price history, audit trail & pricing analytics
 */

/**
 * @swagger
 * /api/v1/analytics/history/{productId}:
 *   get:
 *     summary: Get price change history for a product
 *     description: |
 *       Returns immutable price change records for a product.
 *       Each record explains when and why the price changed.
 *     tags: [Analytics]
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         example: 65f9c3b4a9b1e91234abcd12
 *     responses:
 *       200:
 *         description: Price history retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   oldPrice:
 *                     type: number
 *                   newPrice:
 *                     type: number
 *                   appliedRules:
 *                     type: array
 *                     items:
 *                       type: string
 *                   signals:
 *                     type: object
 *                     properties:
 *                       demandScore:
 *                         type: number
 *                       stock:
 *                         type: number
 *                       marketPrice:
 *                         type: number
 *                   triggeredBy:
 *                     type: string
 *                   createdAt:
 *                     type: string
 *       404:
 *         description: No history found
 */
router.get(
  "/history/:productId",
  AnalyticsController.priceHistory
);

/**
 * @swagger
 * /api/v1/analytics/summary/{productId}:
 *   get:
 *     summary: Get pricing analytics summary for a product
 *     description: |
 *       Returns aggregated pricing statistics such as:
 *       - Average price
 *       - Min / Max price
 *       - Number of price changes
 *     tags: [Analytics]
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         example: 65f9c3b4a9b1e91234abcd12
 *     responses:
 *       200:
 *         description: Pricing analytics summary
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 avgPrice:
 *                   type: number
 *                 minPrice:
 *                   type: number
 *                 maxPrice:
 *                   type: number
 *                 changes:
 *                   type: number
 */
router.get(
  "/summary/:productId",
  AnalyticsController.priceAnalytics
);

export default router;