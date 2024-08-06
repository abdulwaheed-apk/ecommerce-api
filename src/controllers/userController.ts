import express, { Request, Response } from 'express'
import bcrypt from 'bcrypt'

import { User } from '../models/userModel'
import { UpdateProfileBody, RegisterBody, LoginBody } from '../types/User'
import { generateToken } from '../utils/createToken'

//@route /api/v1/users/register
//@method POST To create user
//@access public
export const register = async (
    req: Request<{}, {}, RegisterBody>,
    res: Response
) => {
    const { full_name, email_address, phone_number, password }: RegisterBody =
        req.body
    if (!email_address || !password) {
        return res.status(400).json({ message: 'Please fill all the fields' })
    }
    try {
        const trimmedEmail = email_address.trim().toLowerCase()
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(trimmedEmail)) {
            return res.status(400).json({ message: 'Invalid email format' })
        }

        const userExist = await User.findOne({ trimmedEmail })
        if (userExist) {
            return res
                .status(400)
                .json({ message: 'User with similar email already exist' })
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        const newUser = await User.create({
            full_name,
            email_address: trimmedEmail,
            phone_number,
            password: hashedPassword,
        })

        if (newUser) {
            generateToken(res, newUser._id)
            const { password, is_admin, ...userDetails } = newUser.toObject()

            return res.status(201).json({
                message: 'Account created successfully',
                user: userDetails,
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
export const login = async (req: Request<{}, {}, LoginBody>, res: Response) => {
    const { email_address, password }: LoginBody = req.body

    try {
        if (!email_address || !password) {
            return res
                .status(400)
                .json({ message: "Login fields can't be empty" })
        }

        const trimmedEmail = email_address.trim().toLowerCase()
        if (!trimmedEmail.includes('@')) {
            return res
                .status(400)
                .json({ message: 'Invalid email or password' })
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
export const updateProfile = async (
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

        if (!hasUpdateField) {
            return res.status(400).json({
                message: 'At least one field must be provided for update',
            })
        }

        const user = await User.findById(userId)

        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        }
        // Only verify old password if updating password or email
        if (updateData.password || updateData.email_address) {
            if (!updateData.old_password) {
                return res.status(400).json({
                    message:
                        'Old password is required for updating password or email',
                })
            }
            // Verify old password
            const isPasswordValid = await bcrypt.compare(
                updateData.old_password,
                user.password
            )

            if (!isPasswordValid) {
                return res.status(401).json({ message: 'Invalid old password' })
            }
        }

        // Update fields
        if (updateData.full_name) user.full_name = updateData.full_name
        if (updateData.email_address) {
            // Add email format validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            if (!emailRegex.test(updateData.email_address)) {
                return res.status(400).json({ message: 'Invalid email format' })
            }
            user.email_address = updateData.email_address
        }
        if (updateData.phone_number) user.phone_number = updateData.phone_number

        // If new password is provided, hash it before saving
        if (updateData.password) {
            const hashedPassword = await bcrypt.hash(updateData.password, 10)
            user.password = hashedPassword
        }
        await user.save()

        const { password, is_admin, ...otherUserDetails } = user.toObject()

        res.status(200).json({
            message: 'Profile updated successfully',
            updatedUser: otherUserDetails,
        })
    } catch (error) {
        if (error instanceof Error) {
            if (error.name === 'ValidationError') {
                res.status(400).json({
                    message: 'Validation Error',
                    details: error.message,
                })
            } else {
                res.status(500).json({
                    message: `Server Error: ${error.message}`,
                })
            }
        } else {
            res.status(500).json({ message: 'An unknown error occurred' })
        }
    }
}
//@route /api/v1/users/delete-account
//@method DELETE
//@access Private
export const deleteAccount = async (req: Request, res: Response) => {
    try {
        const user = await User.findById(req?.user?.id)
        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        }
        await User.findByIdAndDelete(req?.user?.id)
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
