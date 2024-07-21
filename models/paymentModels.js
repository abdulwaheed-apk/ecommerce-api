import { Schema, model } from 'mongoose'

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

export const UserPaymentMethod = model(
    'UserPaymentMethod',
    userPaymentMethodSchema
)
export const PaymentType = model('PaymentType', paymentTypeSchema)
