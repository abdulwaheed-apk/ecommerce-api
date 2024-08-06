import { Schema, model } from 'mongoose'

const ProductSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    product_image: { type: String, required: true },
    qty_in_stock: { type: Number, required: true },
    sku: { type: String, required: true, unique: true },
    price: { type: Number, required: true },
    sale_price: Number,
    category: { type: String, enum: ['men', 'women'] },
    variation: { type: [String], enum: ['S', 'M', 'L', 'XL', 'XXL'] },
    color: {
        type: [String],
        enum: ['black', 'white', 'blue', 'green', 'red', 'pink'],
    },
    product_images: [String],
})

export const Product = model('Product', ProductSchema)
