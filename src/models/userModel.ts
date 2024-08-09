import { Schema, model } from 'mongoose'
import { IUser, IUserReview } from '../types/user'

const UserSchema = new Schema<IUser>(
    {
        full_name: String,
        email_address: { type: String, required: true, unique: true },
        phone_number: String,
        password: { type: String, required: true },
        is_admin: { type: Boolean, required: true, default: false },
    },
    {
        timestamps: true,
    }
)

//todo: need to verify the relation of ordered_product_id , either to ProductItem or to OrderLine

const UserReviewSchema = new Schema<IUserReview>({
    user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    ordered_product_id: {
        type: Schema.Types.ObjectId,
        ref: 'ProductItem',
        required: true,
    },
    rating_value: { type: Number, required: true, min: 1, max: 5 },
    comment: String,
})

export const User = model<IUser>('User', UserSchema)
export const Review = model<IUserReview>('Review', UserReviewSchema)
