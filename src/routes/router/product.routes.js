import express from 'express';
import ProductDao from "../../handlers/dao/mongo/productDao.js";

const router = express.Router();

const productDao = new ProductDao();

router
    .route('/productos')
    .get(productDao.getAllProducts)
    .post(productDao.createProduct)

router.route('/productos/:id')
    .get(productDao.getProductById)
    .put(productDao.updateProduct)
    .delete(productDao.deleteProductById)


export const productRoutes = router;