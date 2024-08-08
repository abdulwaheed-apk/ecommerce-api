import { Schema, model } from 'mongoose'
import { IProduct } from '../types/product'

const ProductSchema = new Schema<IProduct>({
    name: { type: String, required: true },
    description: { type: String, required: true },
    product_image: { type: String, required: true },
    qty_in_stock: { type: Number, required: true },
    sku: { type: String, required: true, unique: true },
    price: { type: Number, required: true },
    sale_price: { type: Number, default: 0 },
    category: { type: String, enum: ['men', 'women'], required: true },
    variation: { type: [String], enum: ['S', 'M', 'L', 'XL', 'XXL'] },
    color: {
        type: [String],
        enum: ['black', 'white', 'blue', 'green', 'red', 'pink'],
    },
    product_images: [String],
})

export const Product = model<IProduct>('Product', ProductSchema)
