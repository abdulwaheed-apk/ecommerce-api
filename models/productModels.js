import { Schema, model } from 'mongoose'

// Product Model
const productSchema = new Schema({
    category_id: {
        type: Schema.Types.ObjectId,
        ref: 'ProductCategory',
        required: true,
    },
    name: { type: String, required: true },
    description: String,
    product_image: String,
})

// Product Category Model
const productCategorySchema = new Schema({
    parent_category_id: { type: Schema.Types.ObjectId, ref: 'ProductCategory' },
    category_name: { type: String, required: true },
})

// Product Item Model
const productItemSchema = new Schema({
    product_id: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    SKU: { type: String, required: true },
    qty_in_stock: { type: Number, required: true },
    product_image: String,
    price: { type: Number, required: true },
})

// Product Configuration Model
const productConfigurationSchema = new Schema({
    product_item_id: {
        type: Schema.Types.ObjectId,
        ref: 'ProductItem',
        required: true,
    },
    variation_option_id: {
        type: Schema.Types.ObjectId,
        ref: 'VariationOption',
        required: true,
    },
})

// Variation Model
const variationSchema = new Schema({
    category_id: { type: Schema.Types.ObjectId, ref: 'ProductCategory' },
    name: { type: String, required: true },
})

// Variation Option Model
const variationOptionSchema = new Schema({
    variation_id: {
        type: Schema.Types.ObjectId,
        ref: 'Variation',
        required: true,
    },
    value: { type: String, required: true },
})

// Register models with mongoose
export const Product = model('Product', productSchema)
export const ProductCategory = model('ProductCategory', productCategorySchema)
export const ProductItem = model('ProductItem', productItemSchema)
export const ProductConfiguration = model(
    'ProductConfiguration',
    productConfigurationSchema
)
export const Variation = model('Variation', variationSchema)
export const VariationOption = model('VariationOption', variationOptionSchema)
