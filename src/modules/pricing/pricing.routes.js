import { Router } from "express";
import { PricingController } from "./pricing.controller.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Pricing
 *   description: Dynamic pricing recalculation & rule-based pricing engine
 */

/**
 * @swagger
 * /api/v1/pricing/recalculate/{productId}:
 *   post:
 *     summary: Recalculate dynamic price for a product
 *     description: |
 *       Triggers the dynamic pricing engine for a single product.
 *       Uses demand, inventory, competitor prices, and pricing rules.
 *       Also records price history and triggers alerts automatically.
 *     tags: [Pricing]
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         example: 65f9c3b4a9b1e91234abcd12
 *     responses:
 *       200:
 *         description: Price recalculated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 productId:
 *                   type: string
 *                 oldPrice:
 *                   type: number
 *                 newPrice:
 *                   type: number
 *                 appliedRules:
 *                   type: array
 *                   items:
 *                     type: string
 *                 signals:
 *                   type: object
 *                   properties:
 *                     demandScore:
 *                       type: number
 *                     stock:
 *                       type: number
 *                     marketPrice:
 *                       type: number
 *       404:
 *         description: Product not found
 */
router.post(
  "/recalculate/:productId",
  PricingController.recalculate
);

export default router;