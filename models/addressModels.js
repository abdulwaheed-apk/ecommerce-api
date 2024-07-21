import { Schema, model } from 'mongoose'

const addressSchema = new Schema({
    unit_number: String,
    street_number: String,
    address_line1: String,
    address_line2: String,
    city: String,
    region: String,
    postal_code: String,
    country_id: {
        type: Schema.Types.ObjectId,
        ref: 'Country',
        required: true,
    },
})

const userAddressSchema = new Schema({
    user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    address_id: {
        type: Schema.Types.ObjectId,
        ref: 'Address',
        required: true,
    },
    is_default: { type: Boolean, default: false },
})

export const Address = model('Address', addressSchema)
export const UserAddress = model('UserAddress', userAddressSchema)
