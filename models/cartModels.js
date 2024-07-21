import { Schema, model } from 'mongoose'

// Shopping Cart Model
const shoppingCartSchema = new Schema({
    user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
})

// Shopping Cart Item Model
const shoppingCartItemSchema = new Schema({
    cart_id: {
        type: Schema.Types.ObjectId,
        ref: 'ShoppingCart',
        required: true,
    },
    product_item_id: {
        type: Schema.Types.ObjectId,
        ref: 'ProductItem',
        required: true,
    },
    qty: { type: Number, required: true },
})

export const ShoppingCart = model('ShoppingCart', shoppingCartSchema)
export const ShoppingCartItem = model(
    'ShoppingCartItem',
    shoppingCartItemSchema
)
