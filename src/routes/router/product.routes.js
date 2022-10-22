import express from 'express';
import ProductDao from "../../handlers/dao/mongo/productDao.js";

const router = express.Router();

const productDao = ProductDao.setInstance();

router
  .route('/productos')
  .get(productDao.getAllProducts.bind(productDao))
  .post(productDao.createProduct.bind(productDao));

router.route('/productos/:id')
      .get(productDao.getProductById.bind(productDao))
      .put(productDao.updateProduct.bind(productDao))
      .delete(productDao.deleteProductById.bind(productDao));


export const productRoutes = router;