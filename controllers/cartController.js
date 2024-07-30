import { Cart } from '../models/cartModel.js'

//@route /api/cart
//@method GET To get cart
//@access private
export const getCart = async (req, res) => {
    try {
        //req.user.id as user is authenticated for this route so request headers contains user data. console req
        const cart = await Cart.findOne({ user: req.user.id }).populate(
            'items.product'
        )
        //here if we do not populate   'items.product' , then in cart.items , product value will be just id of product(not whole product data),

        return res.status(200).json({
            message: 'Got cart successfully',
            cart,
        })
    } catch (error) {
        return res
            .status(500)
            .json({ message: `Server Error: ${error.message}` })
    }
}
//@route /api/cart/add
//@method POST To add item to cart
//@access private
export const addProductToCart = async (req, res) => {
    try {
        const { productId, quantity, price } = req.body

        if (!productId || !quantity || !price) {
            return res.status(400).json({ message: 'All fields are required' })
        }
        let cart = await Cart.findOne({ user: req.user.id })

        if (!cart) {
            cart = new Cart({ user: req.user.id, items: [], total: 0 })
        }

        const itemIndex = cart.items.findIndex(
            (item) => item.product.toString() === productId
        )

        if (itemIndex > -1) {
            cart.items[itemIndex].quantity += quantity
        } else {
            cart.items.push({ product: productId, quantity, price })
        }

        cart.total = cart.items.reduce(
            (total, item) => total + item.price * item.quantity,
            0
        )
        await cart.save()
        return res.status(200).json({
            message: 'Product added to cart successfully',
            cart,
        })
    } catch (error) {
        return res
            .status(500)
            .json({ message: `Server Error: ${error.message}` })
    }
}
//@route /api/cart/remove/:productId
//@method DELETE To remove item from cart
//@access private
export const removeProductFromCart = async (req, res) => {
    try {
        const { productId } = req.params

        const cart = await Cart.findOne({ user: req.user.id })
        if (cart.items.length === 0) {
            return res.status(404).json({ message: 'Cart not found' })
        }

        cart.items = cart.items.filter(
            (item) => item.product.toString() !== productId
        )

        cart.total = cart.items.reduce(
            (total, item) => total + item.price * item.quantity,
            0
        )
        await cart.save()

        return res.status(200).json({
            message: 'Product removed from cart successfully',
            cart,
        })
    } catch (error) {
        return res
            .status(500)
            .json({ message: `Server Error: ${error.message}` })
    }
}
