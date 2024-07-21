import { Schema, model } from 'mongoose'

// Shop Order Model
const shopOrderSchema = new Schema({
    user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    order_date: { type: Date, default: Date.now },
    payment_method_id: {
        type: Schema.Types.ObjectId,
        ref: 'UserPaymentMethod',
        required: true,
    },
    shipping_address: {
        type: Schema.Types.ObjectId,
        ref: 'Address',
        required: true,
    },
    shipping_method: {
        type: Schema.Types.ObjectId,
        ref: 'ShippingMethod',
        required: true,
    },
    order_total: { type: Number, required: true },
    order_status: {
        type: Schema.Types.ObjectId,
        ref: 'OrderStatus',
        required: true,
    },
})

// Order Line Model
const orderLineSchema = new Schema({
    product_item_id: {
        type: Schema.Types.ObjectId,
        ref: 'ProductItem',
        required: true,
    },
    order_id: { type: Schema.Types.ObjectId, ref: 'ShopOrder', required: true },
    qty: { type: Number, required: true },
    price: { type: Number, required: true },
})

// Shipping Method Model
const shippingMethodSchema = new Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
})

// Order Status Model
const orderStatusSchema = new Schema({
    status: { type: Boolean, required: true },
})

export const ShopOrder = model('ShopOrder', shopOrderSchema)
export const OrderLine = model('OrderLine', orderLineSchema)
export const ShippingMethod = model('ShippingMethod', shippingMethodSchema)
export const OrderStatus = model('OrderStatus', orderStatusSchema)
