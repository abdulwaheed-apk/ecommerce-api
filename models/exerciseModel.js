import { Schema, model } from 'mongoose'

const exerciseSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        exerciseName: {
            type: String,
            required: [true, 'kindly add exercise name'],
        },
        exerciseType: {
            type: String,
            enum: ['Running', 'Swimming', 'Walking', 'Bicycling', 'Hiking'],
        },
        duration: {
            type: Number,
            default: 30,
        },
        date: {
            type: Date,
            // default: Date.now(),
        },
        details: {
            type: String,
        },
        distance: {
            type: Number,
        },
        calories: {
            type: Number,
        },
    },
    { timestamps: true }
)

export default model('Exercise', exerciseSchema)
