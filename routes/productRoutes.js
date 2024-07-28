import { Router } from 'express'
import { authenticate, authorizeAdmin } from '../middlewares/auth.js'
import {
    createProduct,
    deleteProduct,
    getAllProducts,
    getProductByCategory,
    updateProduct,
} from '../controllers/productController.js'

const router = Router()

//* Protected routes
router.post('/admin/product', authenticate, authorizeAdmin, createProduct)
router.patch('/admin/product/:id', authenticate, authorizeAdmin, updateProduct)
router.delete('/admin/product/:id', authenticate, authorizeAdmin, deleteProduct)
//* Public routes
router.get('/product/all', getAllProducts)
router.get('/product/:category', getProductByCategory)

export default router
