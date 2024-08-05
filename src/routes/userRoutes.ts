import { Router } from 'express'
import { authenticate, authorizeAdmin } from '../middlewares/auth'
import {
    register,
    login,
    logout,
    profileUpdate,
    deleteUser,
    getAllUsers,
} from '../controllers/userController'

const router = Router()

router.get('/', authenticate, authorizeAdmin, getAllUsers)
router.post('/register', register)
router.post('/auth', login)
router.post('/logout', logout)

router.put('/profileUpdate', profileUpdate)
router.delete('/deleteUser', deleteUser)

export default router
