import { ApiError } from "../../common/errors/ApiError.js";
import { ProductRepository } from "./product.repository.js";

export const ProductService = {
  async createProduct(payload) {
    const {
      name,
      category,
      basePrice,
      discountPrice,
      minPrice,
      maxPrice,
    } = payload;

    if (minPrice >= maxPrice) {
      throw new ApiError(
        400,
        "minPrice must be less than maxPrice",
        "PRICE_RANGE_INVALID"
      );
    }

    const startingPrice = discountPrice ?? basePrice;

    if (startingPrice < minPrice || startingPrice > maxPrice) {
      throw new ApiError(
        400,
        "Initial price violates pricing limits",
        "PRICE_LIMIT_VIOLATION"
      );
    }

    return ProductRepository.create({
      name,
      category,
      pricing: {
        basePrice,
        discountPrice,
        dynamicPrice: startingPrice,
        minPrice,
        maxPrice,
      },
    });
  },

  async getProduct(id) {
    const product = await ProductRepository.findById(id);
    if (!product) {
      throw new ApiError(404, "Product not found", "NOT_FOUND");
    }
    return product;
  },

  async listProducts() {
    return ProductRepository.findAll();
  },

  async deleteProduct(id) {
    const product = await ProductRepository.softDelete(id);
    if (!product) {
      throw new ApiError(404, "Product not found", "NOT_FOUND");
    }
    return product;
  },
};