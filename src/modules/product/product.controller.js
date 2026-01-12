import { ProductService } from "./product.service.js";

export const ProductController = {
  async create(req, res) {
    const product = await ProductService.createProduct(req.body);
    res.status(201).json({ success: true, data: product });
  },

  async get(req, res) {
    const product = await ProductService.getProduct(req.params.id);
    res.json({ success: true, data: product });
  },

  async list(req, res) {
    const products = await ProductService.listProducts();
    res.json({ success: true, data: products });
  },

  async remove(req, res) {
    const product = await ProductService.deleteProduct(req.params.id);
    res.json({ success: true, data: product });
  },
};