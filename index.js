import express, { json, urlencoded } from 'express'
import { config } from 'dotenv'
import mongoose from 'mongoose'
import colors from 'colors'
import cookieParser from 'cookie-parser'
import cors from 'cors'
//file imports
import connectDB from './config/connectDatabase.js'
import userRoutes from './routes/userRoutes.js'
import productRoutes from './routes/productRoutes.js'

//app definition
const app = express()

// configuration
app.use(cors())
config()
app.use(cookieParser())
app.use(json())
app.use(urlencoded({ extended: true }))

//Routes
app.get('/', async (req, res) => res.send('Hello'))

app.use('/api/users', userRoutes)
app.use('/api/admin', productRoutes)

const port = process.env.PORT || 5000

connectDB().then(() => {
    app.listen(port, async (req, res) => {
        console.log(`Server started at http://localhost:${port}`.cyan.underline)
    })
})
