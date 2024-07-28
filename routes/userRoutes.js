import { Router } from 'express'
import { authenticate, authorizeAdmin } from '../middlewares/auth.js'
import {
    getAllUsers,
    register,
    login,
    logout,
    profileUpdate,
    deleteUser,
} from '../controllers/userController.js'

const router = Router()

router.get('/', authenticate, authorizeAdmin, getAllUsers)
router.post('/register', register)
router.post('/auth', login)
router.post('/logout', logout)

router.put('/profileUpdate', profileUpdate)
router.delete('/deleteUser', deleteUser)

export default router
