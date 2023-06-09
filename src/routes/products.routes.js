import { Router } from "express";
const router = Router()
import * as productsCtrl from "../controllers/products.controller";

import { authJwt } from "../middlewares";

// /products

router.get('/', productsCtrl.getProducts)
router.post('/', [authJwt.verifyToken, authJwt.isModerator], productsCtrl.createProduct)
router.get('/:productId', productsCtrl.getProductById)
router.put('/:productId',[authJwt.verifyToken, authJwt.isAdmin],productsCtrl.updateProductById)
router.delete('/:productId', [authJwt.verifyToken, authJwt.isAdmin], productsCtrl.deleteProductById)



export default router