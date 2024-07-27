import { Schema, model } from 'mongoose'

// Product Model
const productSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    product_image: { type: String, required: true },
    qty_in_stock: { type: Number, required: true },
    sku: { type: String, required: true },
    price: { type: Number, required: true },
    sale_price: Number,
    category: { type: String, enum: ['men', 'women', 'juniors'] },
    variation: { type: [String], enum: ['S', 'M', 'L', 'XL', 'XXL'] },
    color: {
        type: [String],
        enum: ['black', 'white', 'blue', 'green', 'pink'],
    },
    product_images: [String],
})

// Register model with mongoose
export const Product = model('Product', productSchema)
