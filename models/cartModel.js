import { Schema, model } from 'mongoose'

const CartItemSchema = new Schema({
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
        min: 1,
    },
    price: {
        type: Number,
        required: true,
    },
})

const CartSchema = new Schema(
    {
        user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        items: [CartItemSchema],
        total: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true }
)

export const Cart = model('Cart', CartSchema)
