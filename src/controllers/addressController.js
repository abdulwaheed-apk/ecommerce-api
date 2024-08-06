import { Address, UserDefaultAddress } from '../models/addressModel.js'

//@route /apiV1/address
//@method POST To create address
//@access private
export const createAddress = async (req, res) => {
    try {
        const {
            unit_number,
            street_number,
            address_line1,
            address_line2,
            city,
            region,
            postal_code,
            country,
        } = req.body

        if (
            !unit_number ||
            !street_number ||
            !address_line1 ||
            !city ||
            !region ||
            !postal_code ||
            !country
        ) {
            return res.status(400).json({ message: 'Fill required fields' })
        }
        const address = await Address.create({
            unit_number,
            street_number,
            address_line1,
            address_line2,
            city,
            region,
            postal_code,
            country,
        })

        return res
            .status(201)
            .json({ message: 'New address created successfully', address })
    } catch (error) {
        return res
            .status(500)
            .json({ message: `Server Error: ${error.message}` })
    }
}
//@route /apiV1/address/:addressId/default
//@method POST To set user default address
//@access private
export const userDefaultAddress = async (req, res) => {
    const { addressId } = req.params

    try {
        const address = await Address.findById(addressId)
        if (!address) {
            return res.status(404).json({ message: 'Address not found' })
        }

        const currentDefault = await UserDefaultAddress.findOne({
            user: req.user.id,
        })

        if (currentDefault) {
            if (currentDefault.address_id.toString() === addressId) {
                return res
                    .status(304)
                    .json({ message: 'This address is already default' })
            } else {
                await UserDefaultAddress.deleteOne({ user: req.user.id })
            }
        }

        const newDefaultAddress = new UserDefaultAddress({
            user: req.user.id,
            address_id: addressId,
            is_default: true,
        })

        await newDefaultAddress.save()

        return res.status(201).json({
            message: 'Default address set successfully',
            newDefaultAddress,
        })
    } catch (error) {
        return res
            .status(500)
            .json({ message: `Server Error: ${error.message}` })
    }
}
