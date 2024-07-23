import { Router } from 'express'
import { body, validationResult } from 'express-validator'
import {
    getAllUsers,
    register,
    login,
    logout,
    profileUpdate,
    deleteUser,
} from '../controllers/userController.js'
import { authenticate, authorizeAdmin } from '../middlewares/auth.js'

const router = Router()
// Routes
router.get('/', authenticate, authorizeAdmin, getAllUsers)
router.post('/register', register)
router.post('/auth', login)
router.post('/logout', logout)

router.put('/profileUpdate', profileUpdate)
router.delete('/deleteUser', deleteUser)

export default router
