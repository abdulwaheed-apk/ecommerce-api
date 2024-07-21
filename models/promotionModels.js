import { Schema, model } from 'mongoose'

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

export const Promotion = model('Promotion', promotionSchema)
export const PromotionCategory = model(
    'PromotionCategory',
    promotionCategorySchema
)
