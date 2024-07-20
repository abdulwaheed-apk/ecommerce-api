import express from 'express'
import asyncHandler from 'express-async-handler'
import { genSalt, hash, compare } from 'bcrypt'
import jwt from 'jsonwebtoken'
import { check, validationResult } from 'express-validator'
import userModel from '../models/userModel.js'

// ? Controller Functions
//@route /api/users
//@method GET To get users
//@access Admin
export const getUsers = asyncHandler(async (req, res) => {
    const users = await userModel.find()
    if (users.length === 0) {
        res.status(404).json({ message: 'Users not found' })
    }
    res.status(200).json({ msg: 'All users Only admin is Authorized', users })
})

//@route /api/users/register
//@method POST To create user
//@access public
export const register = async (req, res) => {
    const { full_name, email, phone_number, password } = req.body
    // if express validator has not verified throw errors and not process further
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    try {
        // Find if user already exist
        const userExist = await userModel.findOne({ email })
        if (userExist) {
            res.status(400)
            throw new Error('User with similar email already exist')
        }
        // Hash password
        const salt = await genSalt(10)
        const hashedPassword = await hash(password, salt)
        // create user
        const user = await userModel.create({
            full_name,
            email,
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
    //     const { email, password } = req.body
    //     // if express validator has not verified throw errors and not process further
    //     const errors = validationResult(req)
    //     if (!errors.isEmpty()) {
    //         return res.status(400).json({ errors: errors.array() })
    //     }
    //     try {
    //         if (email === '' || password === '') {
    //             return res
    //                 .status(400)
    //                 .json({ message: 'Kindly enter Login Credentials' })
    //         }
    //         const user = await findOne({ email })
    //         if (!user) {
    //             return res
    //                 .status(404)
    //                 .send({ message: 'User with this email not found' })
    //         }
    //         const isMatch = await compare(password, user.password)
    //         if (isMatch) {
    //             const token = await generateToken(user._id)
    //             // res.cookie(token)
    //             const { name, username } = user
    //             // console.log(name, username)
    //             res.status(200).json({
    //                 name,
    //                 username,
    //                 message: 'you are authentic user',
    //                 token,
    //             })
    //         } else {
    //             res.status(400).json({ message: 'Invalid Password' })
    //         }
    //     } catch (error) {
    //         res.status(500).json({ message: `Server Error ${error.message}` })
    //     }
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
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' })
}
