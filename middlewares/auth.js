import { verify } from 'jsonwebtoken'
import { User } from '../models/userModel.js'

export const authenticate = async (req, res, next) => {
    let token
    token = req.cookies.jwt
    if (token) {
        try {
            const decoded = verify(token, process.env.JWT_SECRET)
            req.user = await User.findById(decoded.id).select('-password')
            next()
        } catch (error) {
            return res.status(401).json({
                message: 'Not authorized, token failed',
                error: error?.message,
            })
        }
    } else {
        return res.status(401).json({ message: 'Not authorized, no token' })
    }
}

export const authorizeAdmin = async (req, res, next) => {
    if (req.user && req.user.is_admin) {
        next()
    } else {
        return res.status(401).json({ message: 'Not authorized as an admin' })
    }
}
