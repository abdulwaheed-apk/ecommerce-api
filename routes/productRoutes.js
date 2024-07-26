import { Router } from 'express'
import { authenticate, authorizeAdmin } from '../middlewares/auth.js'
import { createProduct } from '../controllers/productController.js'

const router = Router()

router.post('/product', authenticate, authorizeAdmin, createProduct)

export default router
