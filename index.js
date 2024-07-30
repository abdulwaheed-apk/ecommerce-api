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
import cartRoutes from './routes/cartRoutes.js'
import orderRoutes from './routes/orderRoutes.js'

//app definition
const app = express()

// configuration
app.use(cors())
config()
app.use(cookieParser())
app.use(json())
app.use(urlencoded({ extended: true }))

//Routes
app.get('/', async (req, res) => res.send('Express.js Server'))

app.use('/apiV1/users', userRoutes)
app.use('/apiV1', productRoutes)
app.use('/apiV1/cart', cartRoutes)
app.use('/apiV1/orders', orderRoutes)

const port = process.env.PORT || 5000

connectDB().then(() => {
    app.listen(port, async (req, res) => {
        console.log(`Server started at http://localhost:${port}`.cyan.underline)
    })
})
