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
            enum: [
                'Pending',
                'Processing',
                'Shipped',
                'Delivered',
                'Cancelled',
            ],
            default: 'Pending',
        },
        shipping_address: {
            street: String,
            city: String,
            state: String,
            country: String,
            zipCode: String,
        },
        payment_method: {
            type: Schema.Types.ObjectId,
            ref: 'PaymentMethod',
            required: true,
        },
        payment_status: {
            type: String,
            enum: ['Pending', 'Completed', 'Failed'],
            default: 'Pending',
        },
    },
    { timestamps: true }
)

export const Order = model('Order', OrderSchema)
