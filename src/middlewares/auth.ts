import { Request, Response, NextFunction } from 'express'
import jwt, { verify } from 'jsonwebtoken'
import { User } from '../models/userModel'
import { IUser } from '../types/user'

interface JwtPayload {
    id: string
    iat: number
    exp: number
}

export const authenticate = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    let token = req.cookies.jwt
    if (token) {
        try {
            const decoded = verify(token, process.env.JWT_SECRET!) as JwtPayload

            const user = await User.findById(decoded.id).select('-password')

            if (!user) {
                return res.status(401).json({
                    message: 'Not authorized, user not found',
                })
            }

            ;(req as Request & { user?: IUser }).user = user
            //? as app was not getting req as express Request and req.user was coming undefined

            next()
        } catch (error) {
            return res
                .status(401)
                .json({ message: 'Not authorized, token failed' })
        }
    } else {
        return res.status(401).json({ message: 'Not authorized, no token' })
    }
}
export const authorizeAdmin = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (req?.user && req.user?.is_admin) {
        next()
    } else {
        return res.status(401).json({ message: 'Not authorized as an admin' })
    }
}
