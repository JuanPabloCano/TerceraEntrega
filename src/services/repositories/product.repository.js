import { Product } from "../../models/mongo/dtos/Product.js";

export default class ProductRepository {

  async find() {
    return Product.find();
  }

  async findByIdAndUpdate(id, { updatedProduct }) {
    return Product.findByIdAndUpdate(id, { $set: { updatedProduct } });
  }

  async findById(id) {
    return Product.findById(id);
  }

  async findByIdAndDelete(id) {
    return Product.findByIdAndDelete(id);
  }
}