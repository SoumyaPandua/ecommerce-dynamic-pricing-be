import Inventory from "./inventory.model.js";

export const InventoryRepository = {
  create: (data) => Inventory.create(data),

  findByProductId: (productId) =>
    Inventory.findOne({ productId }),

  updateStock: (productId, update) =>
    Inventory.findOneAndUpdate(
      { productId },
      update,
      { new: true }
    ),
};