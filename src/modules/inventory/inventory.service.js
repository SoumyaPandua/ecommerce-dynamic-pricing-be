import { ApiError } from "../../common/errors/ApiError.js";
import { InventoryRepository } from "./inventory.repository.js";
import { AlertService } from "../alerts/alert.service.js";

const calculateStatus = (stock, threshold) => {
  if (stock === 0) return "OUT_OF_STOCK";
  if (stock <= threshold) return "LOW_STOCK";
  return "IN_STOCK";
};

export const InventoryService = {
  async createInventory(payload) {
    const existing =
      await InventoryRepository.findByProductId(
        payload.productId
      );

    if (existing) {
      throw new ApiError(
        400,
        "Inventory already exists for product",
        "INVENTORY_EXISTS"
      );
    }

    const status = calculateStatus(
      payload.stock,
      payload.lowStockThreshold ?? 5
    );

    const inventory = await InventoryRepository.create({
      ...payload,
      status,
    });

    // 🔔 Trigger inventory alert if needed
    if (status !== "IN_STOCK") {
      await AlertService.inventoryChanged({
        productId: inventory.productId,
        stock: inventory.stock,
      });
    }

    return inventory;
  },

  async increaseStock(productId, quantity) {
    if (quantity <= 0) {
      throw new ApiError(
        400,
        "Quantity must be positive",
        "INVALID_QUANTITY"
      );
    }

    const inventory =
      await InventoryRepository.findByProductId(productId);

    if (!inventory) {
      throw new ApiError(
        404,
        "Inventory not found",
        "NOT_FOUND"
      );
    }

    inventory.stock += quantity;
    inventory.status = calculateStatus(
      inventory.stock,
      inventory.lowStockThreshold
    );

    const updated = await inventory.save();

    // 🔔 Trigger inventory alert if needed
    if (updated.status !== "IN_STOCK") {
      await AlertService.inventoryChanged({
        productId,
        stock: updated.stock,
      });
    }

    return updated;
  },

  async decreaseStock(productId, quantity) {
    if (quantity <= 0) {
      throw new ApiError(
        400,
        "Quantity must be positive",
        "INVALID_QUANTITY"
      );
    }

    const inventory =
      await InventoryRepository.findByProductId(productId);

    if (!inventory) {
      throw new ApiError(
        404,
        "Inventory not found",
        "NOT_FOUND"
      );
    }

    if (inventory.stock < quantity) {
      throw new ApiError(
        400,
        "Insufficient stock",
        "INSUFFICIENT_STOCK"
      );
    }

    inventory.stock -= quantity;
    inventory.status = calculateStatus(
      inventory.stock,
      inventory.lowStockThreshold
    );

    const updated = await inventory.save();

    // 🔔 Trigger inventory alert if needed
    if (updated.status !== "IN_STOCK") {
      await AlertService.inventoryChanged({
        productId,
        stock: updated.stock,
      });
    }

    return updated;
  },

  async getInventory(productId) {
    const inventory =
      await InventoryRepository.findByProductId(productId);

    if (!inventory) {
      throw new ApiError(
        404,
        "Inventory not found",
        "NOT_FOUND"
      );
    }

    return inventory;
  },
};