import express, { json, urlencoded } from 'express'
import { config } from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from 'cors'
//file imports
import connectDB from './config/connectDatabase'
import userRoutes from './routes/userRoutes'
import productRoutes from './routes/productRoutes'
// import cartRoutes from './routes/cartRoutes'
// import orderRoutes from './routes/orderRoutes'
// import addressRoutes from './routes/addressRoutes'

// configuration
const app = express()
app.use(cors())
config()
app.use(cookieParser())
app.use(json())
app.use(urlencoded({ extended: true }))

//Routes
app.get('/', (req, res) => {
    res.send('Hello, Express with TypeScript!')
})
app.use('/api/v1/users', userRoutes)
app.use('/api/v1', productRoutes)
// app.use('/api/v1/cart', cartRoutes)
// app.use('/api/v1/orders', orderRoutes)
// app.use('/api/v1/address', addressRoutes)

// Connect to MongoDB and run server
const port = process.env.PORT || 5000

connectDB().then(() => {
    app.listen(port, () => {
        console.log(`Server is running at http://localhost:${port}`)
    })
})
