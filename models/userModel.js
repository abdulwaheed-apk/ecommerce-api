import { Schema, model } from 'mongoose'

// User Model
const userSchema = Schema(
    {
        full_name: String,
        email_address: { type: String, required: true, unique: true },
        phone_number: { type: String, required: true },
        password: { type: String, required: true },
    },
    {
        timestamps: true,
    }
)

// User Review Model
//todo: need to verify the relation of ordered_product_id , either to ProductItem or to OrderLine
const userReviewSchema = new Schema({
    user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    ordered_product_id: {
        type: Schema.Types.ObjectId,
        ref: 'ProductItem',
        required: true,
    },
    rating_value: { type: Number, required: true, min: 1, max: 5 },
    comment: String,
})

export default model('User', userSchema)
export const UserReview = model('UserReview', userReviewSchema)
