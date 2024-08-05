import mongoose from 'mongoose'

const connectDB = async () => {
    mongoose
        .connect(process.env.MONGODB_URI!)
        .then(() => console.log('Connected to MongoDB'))
        .catch((error) => console.error('MongoDB connection error:', error))
}
export default connectDB
