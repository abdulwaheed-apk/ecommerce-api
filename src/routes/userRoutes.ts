import { Router } from 'express'
import { authenticate, authorizeAdmin } from '../middlewares/auth'
import {
    register,
    login,
    logout,
    updateProfile,
    deleteAccount,
    getUsers,
} from '../controllers/userController'

const router = Router()

router.get('/', authenticate, authorizeAdmin, getUsers)
router.post('/register', register)
router.post('/login', login)
router.post('/logout', authenticate, logout)

router.patch('/update-profile', authenticate, updateProfile)
router.delete('/delete-account', authenticate, deleteAccount)

export default router
