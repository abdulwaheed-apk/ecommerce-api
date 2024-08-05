import express, { Request, Response } from 'express'
// import asyncHandler from 'express-async-handler'
import { genSalt, hash, compare } from 'bcrypt'
import { User } from '../models/userModel'
import { generateToken } from '../utils/createToken'

//@route /api/v1/users/register
//@method POST To create user
//@access public
export const register = async (req: Request, res: Response) => {
    const { full_name, email_address, phone_number, password } = req.body
    if (!email_address || !password) {
        return res.status(400).json({ message: 'Please fill all the fields' })
    }
    try {
        const userExist = await User.findOne({ email_address })
        if (userExist) {
            return res
                .status(400)
                .json({ message: 'User with similar email already exist' })
        }
        const salt = await genSalt(10)
        const hashedPassword = await hash(password, salt)
        const newUser = await User.create({
            full_name,
            email_address,
            phone_number,
            password: hashedPassword,
        })
        if (newUser) {
            generateToken(res, newUser._id)
            return res.status(201).json({
                message: 'Account created successfully',
                _id: newUser._id,
                name: newUser.full_name,
                email: newUser.email_address,
                isAdmin: newUser.is_admin,
            })
        } else res.status(400).json({ message: 'Invalid user data' })
    } catch (error) {
        if (error instanceof Error) {
            return res
                .status(500)
                .json({ message: `Server Error: ${error.message}` })
        }
    }
}
//@route /api/v1/users/auth
//@method POST
//@access public
export const login = async (req: Request, res: Response) => {
    const { email_address, password } = req.body

    try {
        if (!email_address || !password) {
            return res
                .status(400)
                .json({ message: "Login fields can't be empty" })
        }
        const user = await User.findOne({ email_address })
        if (!user) {
            return res
                .status(404)
                .send({ message: 'User with this email not found' })
        }
        const isMatch = await compare(password, user.password)
        if (isMatch) {
            generateToken(res, user._id)
            return res.status(200).json({
                message: 'LoggedIn successfully',
                _id: user._id,
                name: user.full_name,
                email: user.email_address,
                isAdmin: user.is_admin,
            })
        } else {
            res.status(400).json({ message: 'Invalid Credentials' })
        }
    } catch (error) {
        if (error instanceof Error) {
            return res
                .status(500)
                .json({ message: `Server Error: ${error.message}` })
        }
    }
}
//@route /api/v1/users/logout
//@method POST
//@access private
export const logout = async (req: Request, res: Response) => {
    try {
        res.cookie('jwt', '', {
            httpOnly: true,
            expires: new Date(0),
        })
        return res.status(200).json({ message: 'Logged out successfully' })
    } catch (error) {
        if (error instanceof Error) {
            return res
                .status(500)
                .json({ message: `Server Error: ${error.message}` })
        }
    }
}
//@route /api/v1/users/profileUpdate
//@method PUT
//@access Private
export const profileUpdate = async (req: Request, res: Response) => {
    //     const user = await findById(req.user.id)
    // try {
    //     const { password, newPassword, username, email, name } = req.body
    //     if (!name || !email || !username || !password || !newPassword) {
    //         return res.status(400).json({
    //             message: 'Kindly Add user details to update user data',
    //         })
    //     }
    //     const isMatch = await compare(newPassword, user.password)
    //     if (!isMatch) {
    //         return res
    //             .status(400)
    //             .json({ message: 'Old Password is Incorrect' })
    //     } else {
    //         const newHashedPass = await hash(newPassword, 10)
    //         const updatedUser = await updateOne(
    //             { _id: req.user.id },
    //             {
    //                 name,
    //                 email,
    //                 password: newHashedPass,
    //                 username,
    //             }
    //         )
    //         // console.log('check me if updated', updatedUser)
    //         res.status(200).json(updatedUser)
    //     }
    // } catch (error) {
    //     res.status(500).json({ message: `Server Error ${error.message}` })
    // }
}
//@route /api/v1/users/deleteUser
//@method DELETE
//@access Private
export const deleteUser = async (req: Request, res: Response) => {
    //     try {
    //         const user = await findById(req.user.id)
    //         if (!user) {
    //             return res.status(404).json({ message: 'User not found' })
    //         }
    //         const deletedUser = await findByIdAndDelete(req.user.id)
    //         res.status(200).json({ message: 'Your Account Deleted Successfully' })
    //     } catch (error) {
    // if (error instanceof Error) {
    //     return res
    //         .status(500)
    //         .json({ message: `Server Error: ${error.message}` })
    // }
    //     }
}
//@route /api/v1/users
//@method GET To get users
//@access Admin
export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.find({})

        if (users.length === 0) {
            return res.status(404).json({ message: 'Users not found' })
        }
        res.status(200).json({ users })
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: `Server Error: ${error.message}` })
        } else {
            res.status(500).json({ message: 'An unknown error occurred' })
        }
    }
}
