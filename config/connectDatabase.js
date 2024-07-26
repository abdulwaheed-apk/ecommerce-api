import { connect } from 'mongoose'

const connectDB = async () => {
    try {
        await connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log('MongoDB connected'.bgYellow)
    } catch (err) {
        console.log(err)
        process.exit(1)
    }
}

export default connectDB
