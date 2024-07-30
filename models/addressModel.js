import { Schema, model } from 'mongoose'

const AddressSchema = new Schema({
    unit_number: String,
    street_number: String,
    address_line1: String,
    address_line2: String,
    city: String,
    region: String,
    postal_code: String,
    country: String,
})

const UserAddressSchema = new Schema({
    user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    address_id: {
        type: Schema.Types.ObjectId,
        ref: 'Address',
        required: true,
    },
    is_default: { type: Boolean, default: false },
})

export const Address = model('Address', AddressSchema)
export const UserAddress = model('UserAddress', UserAddressSchema)
