import { Product } from "../../models/mongo/dtos/Product.js";

export default class ProductRepository {

  static async find() {
    return Product.find();
  }

  static async findByIdAndUpdate(id, { updatedProduct }) {
    return Product.findByIdAndUpdate(id, { $set: { updatedProduct } });
  }

  static async findById(id) {
    return Product.findById(id);
  }

  static async findByIdAndDelete(id) {
    return Product.findByIdAndDelete(id);
  }
}