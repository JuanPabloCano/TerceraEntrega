import { Router } from 'express';
import { shoppingCartRoutes } from './router/shoppingCart.routes.js';
import { productRoutes } from './router/product.routes.js';
import { userLogin } from "./router/login.js";

export const router = Router();

router.use('/', productRoutes);
router.use('/', shoppingCartRoutes);
router.use('/', userLogin);

