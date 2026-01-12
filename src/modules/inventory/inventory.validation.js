import Joi from "joi";

export const createInventorySchema = Joi.object({
  productId: Joi.string().required(),
  stock: Joi.number().min(0).required(),
  lowStockThreshold: Joi.number().min(0).optional(),
});

export const updateStockSchema = Joi.object({
  quantity: Joi.number().integer().required(),
});