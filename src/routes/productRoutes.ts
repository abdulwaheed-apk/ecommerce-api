import { Router } from 'express'

import { authenticate, authorizeAdmin } from '../middlewares/auth'
import {
    createProduct,
    deleteProduct,
    getAllProducts,
    getProduct,
    updateProduct,
    getProductByCategory,
} from '../controllers/productController'

const router = Router()

// Protected routes
router.post('/admin/product', authenticate, authorizeAdmin, createProduct)
router.patch('/admin/product/:id', authenticate, authorizeAdmin, updateProduct)
router.delete('/admin/product/:id', authenticate, authorizeAdmin, deleteProduct)

// Public routes
router.get('/products', getAllProducts)
router.get('/products/:productId', getProduct)
router.get('/products/:category', getProductByCategory)

export default router
