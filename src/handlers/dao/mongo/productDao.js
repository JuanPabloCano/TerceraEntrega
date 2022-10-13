import ProductService from '../../../services/mongo/product.service.js';

let instance;

export default class ProductDao extends ProductService {
  constructor() {
    super();
  }

  static setInstance() {
    if (!instance) {
      instance = new ProductDao();
    }
    return instance;
  }
}