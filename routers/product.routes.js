import { Router } from "express";
import productController from "../controllers/product.controller.js";
import { verifyToken } from "../controllers/verifyToken.js";
const router = Router();
router.get('/',productController.getAllProducts);
router.get('/getOneProduct/:id',productController.getOneProduct);
router.post('/addproduct',verifyToken,productController.addProduct);
router.patch('/editproduct/:id',verifyToken,productController.editProduct);
router.delete('/deleteproduct/:id',verifyToken,productController.deleteProduct);
export default router;
