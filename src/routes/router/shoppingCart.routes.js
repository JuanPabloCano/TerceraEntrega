import express from 'express';
import ShoppingCartDao from "../../handlers/dao/mongo/shoppingCartDao.js";
const router = express.Router();

const shoppingCartDao = new ShoppingCartDao();

router
    .route('/carrito')
    .get(shoppingCartDao.getAllShoppingCarts)
    .post(shoppingCartDao.createShoppingCart)

router.route('/carrito/:id/productos')
    .get(shoppingCartDao.getProductsByShoppingCart)
    .put()
    .delete()


export const shoppingCartRoutes = router;