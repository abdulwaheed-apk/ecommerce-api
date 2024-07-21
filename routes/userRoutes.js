import { Router } from 'express'
import { body, validationResult } from 'express-validator'
import {
    getUsers,
    register,
    login,
    profileUpdate,
    deleteUser,
} from '../controllers/userController.js'
import User from '../models/userModel.js'
import verifyToken from '../middlewares/auth.js'

const router = Router()
// Routes
router.get('/', getUsers)
router.post('/register', register)
router.post('/login', login)
router.put('/profileUpdate', verifyToken, profileUpdate)
router.delete('/deleteUser', verifyToken, deleteUser)

export default router
