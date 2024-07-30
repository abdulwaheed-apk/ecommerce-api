import { Router } from 'express'
import { authenticate, authorizeAdmin } from '../middlewares/auth.js'
import {
    cancelOrder,
    createOrder,
    getOrderById,
    getUserOrders,
    updateOrderStatus,
} from '../controllers/orderController.js'

const router = Router()

router.post('/', authenticate, createOrder)
router.get('/', authenticate, getUserOrders)
router.get('/:orderId', authenticate, getOrderById)
router.patch(
    '/admin/:orderId/status',
    authenticate,
    authorizeAdmin,
    updateOrderStatus
)
router.post('/:orderId/cancel', authenticate, cancelOrder)

export default router
