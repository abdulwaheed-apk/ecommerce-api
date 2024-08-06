import { Schema, model } from 'mongoose'

const countrySchema = new Schema({
    country_name: { type: String, required: true },
})

export default model('Country', countrySchema)
