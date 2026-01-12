import Joi from "joi";

export const upsertCompetitorPriceSchema = Joi.object({
  productId: Joi.string().required(),
  competitor: Joi.string().required(),
  price: Joi.number().positive().required(),
  currency: Joi.string().optional(),
  source: Joi.string()
    .valid("MANUAL", "API", "SCRAPER")
    .optional(),
});