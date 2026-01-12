import { Router } from "express";
import { DemandController } from "./demand.controller.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Demand
 *   description: Demand tracking APIs (views, cart actions, purchases)
 */

/**
 * @swagger
 * /api/v1/demand/event:
 *   post:
 *     summary: Record a demand event
 *     description: |
 *       Records a demand signal for a product.
 *       Supported event types:
 *       - VIEW
 *       - ADD_TO_CART
 *       - PURCHASE
 *     tags: [Demand]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - productId
 *               - eventType
 *             properties:
 *               productId:
 *                 type: string
 *                 example: 65f9c3b4a9b1e91234abcd12
 *               eventType:
 *                 type: string
 *                 enum: [VIEW, ADD_TO_CART, PURCHASE]
 *                 example: VIEW
 *     responses:
 *       204:
 *         description: Demand event recorded successfully
 *       400:
 *         description: Invalid demand event
 */
router.post("/event", DemandController.record);

/**
 * @swagger
 * /api/v1/demand/{productId}:
 *   get:
 *     summary: Get demand metrics for a product
 *     description: |
 *       Returns aggregated demand metrics and demand score
 *       for the configured time window.
 *     tags: [Demand]
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         example: 65f9c3b4a9b1e91234abcd12
 *     responses:
 *       200:
 *         description: Demand metrics retrieved successfully
 */
router.get("/:productId", DemandController.getMetrics);

export default router;