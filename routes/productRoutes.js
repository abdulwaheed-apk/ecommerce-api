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

router.post('/product', authenticate, authorizeAdmin, createProduct)
router.get('/product/all', authenticate, authorizeAdmin, getAllProducts)
router.delete('/product/:id', authenticate, authorizeAdmin, deleteProduct)
router.patch('/product/:id', authenticate, authorizeAdmin, updateProduct)

router.get(
    '/product/:category',
    authenticate,
    authorizeAdmin,
    getProductByCategory
)

export default router
