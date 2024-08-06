import { Document, Types } from 'mongoose'

export interface IUser extends Document {
    _id: Types.ObjectId
    full_name?: string
    email_address: string
    phone_number?: string
    password: string
    is_admin: boolean
    createdAt: Date
    updatedAt: Date
}
export interface IUserReview extends Document {
    user_id: Types.ObjectId | IUser
    ordered_product_id: Types.ObjectId // Assuming ProductItem
    rating_value: number
    comment?: string
}

export interface RegisterBody {
    full_name?: string
    email_address: string
    phone_number?: string
    password: string
}
export interface LoginBody {
    email_address: string
    password: string
}
export interface UpdateProfileBody {
    full_name?: string
    email_address?: string
    phone_number?: string
    password?: string
    old_password: string
}
