import jwt from 'jsonwebtoken'
import { Types } from 'mongoose'
import { Response } from 'express'

export const generateToken = async (res: Response, id: Types.ObjectId) => {
    const token = jwt.sign({ id: id.toString() }, process.env.JWT_SECRET!, {
        expiresIn: '30d',
    })
    // Set JWT as an HTTP-Only Cookie
    res.cookie('jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'strict',
        maxAge: 30 * 24 * 60 * 60 * 1000,
    })
    return token
}
