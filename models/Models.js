const mongoose = require('mongoose')
const Schema = mongoose.Schema

// User Model
const userSchema = new Schema({
    email_address: { type: String, required: true, unique: true },
    phone_number: { type: String, required: true },
    password: { type: String, required: true },
})

// Address Model
const addressSchema = new Schema({
    unit_number: String,
    street_number: String,
    address_line1: String,
    address_line2: String,
    city: String,
    region: String,
    postal_code: String,
    country_id: { type: Schema.Types.ObjectId, ref: 'Country', required: true },
})

// User Address Model
const userAddressSchema = new Schema({
    user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    address_id: { type: Schema.Types.ObjectId, ref: 'Address', required: true },
    is_default: { type: Boolean, default: false },
})

// Country Model
const countrySchema = new Schema({
    country_name: { type: String, required: true },
})

// User Payment Method Model
const userPaymentMethodSchema = new Schema({
    user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    payment_type_id: {
        type: Schema.Types.ObjectId,
        ref: 'PaymentType',
        required: true,
    },
    provider: { type: String, required: true },
    account_number: { type: String, required: true },
    expiry_date: { type: Date, required: true },
    is_default: { type: Boolean, default: false },
})

// Payment Type Model
const paymentTypeSchema = new Schema({
    value: { type: String, required: true },
})

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
    status: { type: String, required: true },
})

// User Review Model
const userReviewSchema = new Schema({
    user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    ordered_product_id: {
        type: Schema.Types.ObjectId,
        ref: 'ProductItem',
        required: true,
    },
    rating_value: { type: Number, required: true, min: 1, max: 5 },
    comment: String,
})

// Promotion Model
const promotionSchema = new Schema({
    name: { type: String, required: true },
    description: String,
    discount_rate: { type: Number, required: true },
    start_date: { type: Date, required: true },
    end_date: { type: Date, required: true },
})

// Promotion Category Model
const promotionCategorySchema = new Schema({
    category_id: {
        type: Schema.Types.ObjectId,
        ref: 'ProductCategory',
        required: true,
    },
    promotion_id: {
        type: Schema.Types.ObjectId,
        ref: 'Promotion',
        required: true,
    },
})

// Register models with mongoose
mongoose.model('User', userSchema)
mongoose.model('Address', addressSchema)
mongoose.model('UserAddress', userAddressSchema)
mongoose.model('Country', countrySchema)
mongoose.model('UserPaymentMethod', userPaymentMethodSchema)
mongoose.model('PaymentType', paymentTypeSchema)
mongoose.model('ShoppingCart', shoppingCartSchema)
mongoose.model('ShoppingCartItem', shoppingCartItemSchema)
mongoose.model('Product', productSchema)
mongoose.model('ProductCategory', productCategorySchema)
mongoose.model('ProductItem', productItemSchema)
mongoose.model('ProductConfiguration', productConfigurationSchema)
mongoose.model('Variation', variationSchema)
mongoose.model('VariationOption', variationOptionSchema)
mongoose.model('ShopOrder', shopOrderSchema)
mongoose.model('OrderLine', orderLineSchema)
mongoose.model('ShippingMethod', shippingMethodSchema)
mongoose.model('OrderStatus', orderStatusSchema)
mongoose.model('UserReview', userReviewSchema)
mongoose.model('Promotion', promotionSchema)
mongoose.model('PromotionCategory', promotionCategorySchema)
