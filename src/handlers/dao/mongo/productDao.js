import ProductService from '../../../services/mongo/product.service.js';

let instance;

export default class ProductDao extends ProductService {
  constructor(productRepository) {
    super(productRepository);
  }

  static setInstance() {
    if (!instance) {
      instance = new ProductDao();
    }
    return instance;
  }
}