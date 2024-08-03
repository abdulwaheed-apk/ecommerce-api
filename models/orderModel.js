import { Schema, model } from 'mongoose'

const OrderItemSchema = new Schema({
    product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true, min: 1 },
    price: { type: Number, required: true },
})

const OrderSchema = new Schema(
    {
        user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        items: [OrderItemSchema],
        total: { type: Number, required: true },
        order_status: {
            type: String,
            enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled',],
            default: 'Pending',
        },
        shipping_address: {
            type: Schema.Types.ObjectId,
            ref: 'UserDefaultAddress',
            required: true,
        },
        payment_method: {
            type: String,
            required: true,
            default: 'card'
        },
        payment_status: {
            type: String,
            enum: ['Pending', 'Completed', 'Failed'],
            default: 'Pending',
        },
        stripe_payment_intent_id: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
)

export const Order = model('Order', OrderSchema)
