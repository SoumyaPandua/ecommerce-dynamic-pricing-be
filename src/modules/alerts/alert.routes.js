import { Router } from "express";
import { AlertController } from "./alert.controller.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Alerts
 *   description: Alert configuration & notification triggers
 */

/**
 * @swagger
 * /api/v1/alerts:
 *   post:
 *     summary: Create an alert configuration
 *     description: |
 *       Creates an alert rule that listens to system events
 *       such as price changes or inventory changes.
 *     tags: [Alerts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - type
 *               - target
 *             properties:
 *               type:
 *                 type: string
 *                 enum:
 *                   - PRICE_INCREASE
 *                   - PRICE_DECREASE
 *                   - LOW_STOCK
 *                   - OUT_OF_STOCK
 *                 example: PRICE_INCREASE
 *               threshold:
 *                 type: number
 *                 description: Optional threshold (percent or quantity)
 *                 example: 5
 *               channels:
 *                 type: array
 *                 items:
 *                   type: string
 *                   enum: [EMAIL, WEBHOOK]
 *                 example: [EMAIL]
 *               target:
 *                 type: string
 *                 description: Email address or webhook URL
 *                 example: admin@company.com
 *               enabled:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       201:
 *         description: Alert created successfully
 *       400:
 *         description: Invalid alert configuration
 */
router.post("/", AlertController.create);

/**
 * @swagger
 * /api/v1/alerts:
 *   get:
 *     summary: List all alert configurations
 *     description: Returns all alert rules configured in the system
 *     tags: [Alerts]
 *     responses:
 *       200:
 *         description: List of alerts
 */
router.get("/", AlertController.list);

export default router;