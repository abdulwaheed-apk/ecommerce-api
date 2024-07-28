import { Router } from 'express'
import { authenticate } from '../middlewares/auth.js'
import {
    addProductToCart,
    getCart,
    removeProductFromCart,
} from '../controllers/cartController.js'

const router = Router()

router.get('/', authenticate, getCart)
router.post('/add', authenticate, addProductToCart)
router.delete('/remove/:productId', authenticate, removeProductFromCart)

export default router
