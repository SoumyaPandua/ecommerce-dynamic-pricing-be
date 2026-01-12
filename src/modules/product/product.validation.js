import Joi from "joi";

export const createProductSchema = Joi.object({
  name: Joi.string().required(),
  category: Joi.string().required(),
  basePrice: Joi.number().positive().required(),
  discountPrice: Joi.number().positive().optional(),
  minPrice: Joi.number().positive().required(),
  maxPrice: Joi.number().positive().required(),
});