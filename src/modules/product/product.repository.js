import Product from "./product.model.js";

export const ProductRepository = {
  create: (data) => Product.create(data),

  findById: (id) =>
    Product.findOne({ _id: id, deletedAt: null }),

  findAll: () => Product.find({ deletedAt: null }),

  update: (id, data) =>
    Product.findByIdAndUpdate(id, data, { new: true }),

  softDelete: (id) =>
    Product.findByIdAndUpdate(
      id,
      { deletedAt: new Date() },
      { new: true }
    ),
};