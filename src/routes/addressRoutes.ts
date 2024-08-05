import { Router } from 'express'
import { authenticate } from '../middlewares/auth.js'
import {
    createAddress,
    userDefaultAddress,
} from '../controllers/addressController.js'

const router = Router()

router.post('/', authenticate, createAddress)
router.post('/:addressId/default', authenticate, userDefaultAddress)

export default router
