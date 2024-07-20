import { Schema, model } from 'mongoose'

const userSchema = Schema(
    {
        full_name: {
            type: String,
        },
        email: {
            type: String,
            required: [true, 'Kindly add your email'],
            unique: true,
        },
        phone_number: {
            type: Number,
        },
        password: {
            type: String,
            required: [true, 'Kindly Enter Password'],
        },
    },
    {
        timestamps: true,
    }
)

export default model('userModel', userSchema)
