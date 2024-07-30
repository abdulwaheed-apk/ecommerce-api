import { Order } from '../models/orderModel.js'

//@route /apiV1/orders
//@method POST To Create order
//@access private
export const createOrder = async (req, res) => {
    try {
        res.send('createOrder')
    } catch (error) {
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
