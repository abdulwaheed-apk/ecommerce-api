import { connect } from 'mongoose'

const connectDB = async () => {
    try {
        await connect(process.env.MONGODB_URI)
        console.log('Database connected: Go on '.bgGreen)
    } catch (err) {
        console.log(err)
        process.exit(1)
    }
}

export default connectDB
