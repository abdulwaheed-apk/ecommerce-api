import { Schema, model } from 'mongoose'

const AddressSchema = new Schema({
    unit_number: {
        type: String,
        required: true,
    },
    street_number: {
        type: String,
        required: true,
    },
    address_line1: {
        type: String,
        required: true,
    },
    address_line2: String,
    city: {
        type: String,
        required: true,
    },
    region: {
        type: String,
        required: true,
    },
    postal_code: {
        type: Number,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
})

const UserDefaultAddressSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    address_id: {
        type: Schema.Types.ObjectId,
        ref: 'Address',
        required: true,
    },
    is_default: { type: Boolean, default: true },
})

export const Address = model('Address', AddressSchema)
export const UserDefaultAddress = model(
    'UserDefaultAddress',
    UserDefaultAddressSchema
)
