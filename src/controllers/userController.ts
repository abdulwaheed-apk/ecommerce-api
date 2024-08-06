import express, { Request, Response } from 'express'
import bcrypt from 'bcrypt'

import { User } from '../models/userModel'
import { generateToken } from '../utils/createToken'
import { UpdateProfileBody } from '../types/User'

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
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
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
            res.status(500).json({ message: `Server Error: ${error.message}` })
        } else {
            res.status(500).json({ message: 'An unknown error occurred' })
        }
    }
}
//@route /api/v1/users/login
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
        const isMatch = await bcrypt.compare(password, user.password)
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
            res.status(500).json({ message: `Server Error: ${error.message}` })
        } else {
            res.status(500).json({ message: 'An unknown error occurred' })
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
            res.status(500).json({ message: `Server Error: ${error.message}` })
        } else {
            res.status(500).json({ message: 'An unknown error occurred' })
        }
    }
}
//@route /api/v1/users/update-profile
//@method PATCH
//@access Private
export const profileUpdate = async (
    req: Request<{}, {}, UpdateProfileBody>,
    res: Response
) => {
    try {
        const userId = req.user?.id
        const updateData: UpdateProfileBody = req.body

        // Check if at least one field is provided for update
        const updateFields = [
            'full_name',
            'email_address',
            'phone_number',
            'password',
        ]
        const hasUpdateField = updateFields.some((field) =>
            updateData.hasOwnProperty(field)
        )
        console.log('hasUpdateField', hasUpdateField)
        if (!hasUpdateField) {
            return res.status(400).json({
                message: 'At least one field must be provided for update',
            })
        }

        const user = await User.findById(userId)

        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        }
        // Verify old password
        const isPasswordValid = await bcrypt.compare(
            updateData.old_password,
            user.password
        )

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid old password' })
        }

        // Update fields
        if (updateData.full_name) user.full_name = updateData.full_name
        if (updateData.email_address) {
            user.email_address = updateData.email_address
        }
        if (updateData.phone_number) user.phone_number = updateData.phone_number

        // If new password is provided, hash it before saving
        if (updateData.password) {
            const hashedPassword = await bcrypt.hash(updateData.password, 10)
            user.password = hashedPassword
        }
        await user.save()

        const updatedUser = await User.findById(userId).select('-password')

        res.status(200).json({
            message: 'Profile updated successfully',
            updatedUser,
        })
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: `Server Error: ${error.message}` })
        } else {
            res.status(500).json({ message: 'An unknown error occurred' })
        }
    }
}
//@route /api/v1/users/delete-account
//@method DELETE
//@access Private
export const deleteUser = async (req: Request, res: Response) => {
    try {
        const user = await User.findById(req?.user?.id)
        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        }
        const deletedUser = await User.findByIdAndDelete(req?.user?.id)
        res.status(200).json({ message: 'Your Account Deleted Successfully' })
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: `Server Error: ${error.message}` })
        } else {
            res.status(500).json({ message: 'An unknown error occurred' })
        }
    }
}
//@route /api/v1/users
//@method GET To get users
//@access Admin
export const getUsers = async (req: Request, res: Response) => {
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
