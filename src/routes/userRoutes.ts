import { Router } from 'express'
import { authenticate, authorizeAdmin } from '../middlewares/auth'
import {
    register,
    login,
    logout,
    profileUpdate,
    deleteUser,
    getUsers,
} from '../controllers/userController'

const router = Router()

router.get('/', authenticate, authorizeAdmin, getUsers)
router.post('/register', register)
router.post('/login', login)
router.post('/logout', authenticate, logout)

router.patch('/update-profile', authenticate, profileUpdate)
router.delete('/delete-account', authenticate, deleteUser)

export default router
