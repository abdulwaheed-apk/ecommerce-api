import express from 'express'
import asyncHandler from 'express-async-handler'
import { genSalt, hash, compare } from 'bcrypt'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { check, validationResult } from 'express-validator'
import User from '../models/userModel.js'

// ? Controller Functions
//@route /api/users
//@method GET To get users
//@access Admin
export const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find()
    if (users.length === 0) {
        res.status(404).json({ message: 'Users not found' })
    }
    res.status(200).json({ msg: 'All users Only admin is Authorized', users })
})

//@route /api/users/register
//@method POST To create user
//@access public
export const register = async (req, res) => {
    const { full_name, email_address, phone_number, password } = req.body

    try {
        // Find if user already exist
        const userExist = await User.findOne({ email_address })
        if (userExist) {
            res.status(400)
            throw new Error('User with similar email already exist')
        }
        // Hash password
        const salt = await genSalt(10)
        const hashedPassword = await hash(password, salt)
        // create user
        const user = await User.create({
            full_name,
            email_address,
            phone_number,
            password: hashedPassword,
        })
        if (user) {
            res.status(201).json({
                token: await generateToken(user._id),
            })
        } else {
            res.status(400).json({ message: 'Invalid user Data' })
        }
    } catch (error) {
        res.status(500).json({ message: `Server Error ${error.message}` })
    }
}
//@route /api/users/login
//@method POST
//@access public
export const login = async (req, res) => {
    const { email_address, password } = req.body

    try {
        if (email_address === '' || password === '') {
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
            const token = await generateToken(user._id)
            // res.cookie(token)
            res.status(200).json({
                message: 'LoggedIn Successfully',
                token: token,
            })
        } else {
            res.status(400).json({ message: 'Invalid Credentials' })
        }
    } catch (error) {
        res.status(500).json({ message: `Server Error ${error.message}` })
    }
}
//@route /api/users/profileUpdate
//@method PUT
//@access Private
export const profileUpdate = async (req, res) => {
    //     const user = await findById(req.user.id)
    //     try {
    //         const { password, newPassword, username, email, name } = req.body
    //         if (!name || !email || !username || !password || !newPassword) {
    //             return res.status(400).json({
    //                 message: 'Kindly Add user details to update user data',
    //             })
    //         }
    //         const isMatch = await compare(newPassword, user.password)
    //         if (!isMatch) {
    //             return res
    //                 .status(400)
    //                 .json({ message: 'Old Password is Incorrect' })
    //         } else {
    //             const newHashedPass = await hash(newPassword, 10)
    //             const updatedUser = await updateOne(
    //                 { _id: req.user.id },
    //                 {
    //                     name,
    //                     email,
    //                     password: newHashedPass,
    //                     username,
    //                 }
    //             )
    //             // console.log('check me if updated', updatedUser)
    //             res.status(200).json(updatedUser)
    //         }
    //     } catch (error) {
    //         res.status(500).json({ message: `Server Error ${error.message}` })
    //     }
}
//@route /api/users/deleteUser
//@method DELETE
//@access Private
export const deleteUser = async (req, res) => {
    //     try {
    //         const user = await findById(req.user.id)
    //         if (!user) {
    //             return res.status(404).json({ message: 'User not found' })
    //         }
    //         const deletedUser = await findByIdAndDelete(req.user.id)
    //         res.status(200).json({ message: 'Your Account Deleted Successfully' })
    //     } catch (error) {
    //         res.status(500).json({ message: `Server Error ${error.message}` })
    //     }
}
// Token Generate Function
const generateToken = async (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' })
}
