import { InventoryService } from "./inventory.service.js";

export const InventoryController = {
  async create(req, res) {
    const inventory = await InventoryService.createInventory(req.body);
    res.status(201).json({ success: true, data: inventory });
  },

  async increase(req, res) {
    const inventory = await InventoryService.increaseStock(
      req.params.productId,
      req.body.quantity
    );
    res.json({ success: true, data: inventory });
  },

  async decrease(req, res) {
    const inventory = await InventoryService.decreaseStock(
      req.params.productId,
      req.body.quantity
    );
    res.json({ success: true, data: inventory });
  },

  async get(req, res) {
    const inventory = await InventoryService.getInventory(
      req.params.productId
    );
    res.json({ success: true, data: inventory });
  },
};