import { Address, UserDefaultAddress } from '../models/addressModel.js'
import { config } from 'dotenv'
import { Cart } from '../models/cartModel.js'
import { Order } from '../models/orderModel.js'
import Stripe from 'stripe'

config()
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
//@route /apiV1/orders
//@method POST To Create order
//@access private
export const createOrder = async (req, res) => {
    try {
        const { userDefaultAddressId, paymentMethod } = req.body

        const cart = await Cart.findOne({ user: req.user.id }).populate('items.product')

        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ message: 'Cart is empty' })
        }

        const userDefaultAddress = await UserDefaultAddress.findOne({ address_id: userDefaultAddressId }).populate('address_id')

        //todo: Here or in default address, if user has only one address, and which is not set to default address, then consider that address as default

        if (!userDefaultAddress) {
            return res.status(400).json({ message: 'Shipping address not found' })
        }

        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(cart.total * 100),
            currency: 'usd',
            // confirm: true,
            automatic_payment_methods: { enabled: true },
            // return_url: 'https://your-website.com/order-confirmation',
        })
        res.json({ clientSecret: paymentIntent.client_secret })
        console.log('paymentIntent', paymentIntent)

        if (paymentIntent.status !== 'succeeded') {
            return res.status(400).json({ message: 'Payment failed' })
        }

        const order = await Order.create({
            user: req.user.id,
            items: cart.items.map((item) => ({
                product: item.product._id,
                quantity: item.quantity,
                price: item.product.price,
            })),
            total: cart.total,
            shipping_address: userDefaultAddressId,
            payment_method: paymentMethod,
            payment_status: 'Completed',
            stripe_payment_intent_id: paymentIntent.id,
        })

        await Cart.findOneAndDelete({ user: req.user.id })

        return res.status(201).json({ message: 'Order placed successfully', order })

    } catch (error) {
        if (error.type === 'StripeCardError') {
            return res.status(400).json({ message: error.message })
        }
        return res
            .status(500)
            .json({ message: `Server Error: ${error.message}` })
    }
}
//@route /apiV1/orders
//@method GET To get all order
//@access private
export const getUserOrders = async (req, res) => {
    try {
        res.send('getUserOrders')
    } catch (error) {
        return res
            .status(500)
            .json({ message: `Server Error: ${error.message}` })
    }
}
//@route /apiV1/orders/:orderId
//@method GET To specific order
//@access private
export const getOrderById = async (req, res) => {
    try {
        res.json({ name: 'getOrderById', id: req.params.orderId })
    } catch (error) {
        return res
            .status(500)
            .json({ message: `Server Error: ${error.message}` })
    }
}
//@route /apiV1/orders/admin/:orderId/status
//@method PATCH  To update order status
//@access private only admin
export const updateOrderStatus = async (req, res) => {
    try {
        res.json({
            name: 'updateOrderStatus only admin',
            id: req.params.orderId,
        })
    } catch (error) {
        return res
            .status(500)
            .json({ message: `Server Error: ${error.message}` })
    }
}
//@route /apiV1/orders/:orderId/cancel
//@method POST  To cancel an order
//@access private
export const cancelOrder = async (req, res) => {
    try {
        res.json({
            name: 'cancelOrder',
            id: req.params.orderId,
        })
    } catch (error) {
        return res
            .status(500)
            .json({ message: `Server Error: ${error.message}` })
    }
}
