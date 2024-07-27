import { Product } from '../models/productModel.js'

//@route /api/admin/product/all
//@method GET To get all product
//@access private only admin
export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({})
        if (products.length === 0) {
            res.status(404).json({ message: 'Products not found' })
        }
        res.status(200).json({ message: 'All products', products })
    } catch (error) {
        res.status(500).json({ message: `Server Error ${error.message}` })
    }
}
//@route /api/admin/product
//@method POST To create product
//@access private only admin
export const createProduct = async (req, res) => {
    const {
        name,
        description,
        product_image,
        qty_in_stock,
        sku,
        price,
        sale_price,
        category,
        variation,
        color,
        product_images,
    } = req.body

    try {
        const product = await Product.create({
            name,
            description,
            product_image,
            qty_in_stock,
            sku,
            price,
            sale_price: sale_price ? sale_price : 0,
            category,
            variation,
            color,
            product_images: product_images,
        })
        console.log('product created', product)
        return res.status(201).json({
            message: 'Product created successfully',
            product,
        })
    } catch (error) {
        res.status(500).json({ message: `Server Error ${error.message}` })
    }
}
//@route /api/admin/product/:id
//@method DELETE To delete product
//@access private only admin
export const deleteProduct = async (req, res) => {
    const product = await Product.findById(req.params.id)

    try {
        if (!product) {
            return res.status(404).json({ message: 'Product not found' })
        }
        const deletedProduct = await Product.findByIdAndDelete(req.params.id)
        res.status(200).json({ message: 'Product Deleted Successfully' })
    } catch (error) {
        res.status(500).json({ message: `Server Error ${error.message}` })
    }
}
//@route /api/admin/product/:id
//@method PUT/PATCH To update product
//@access private only admin
export const updateProduct = async (req, res) => {
    const product = await Product.findById(req.params.id)

    res.status(200).json({
        message: 'Got it',
        id: req.params.id,
        q: `Do you want to update ${product.name}`,
    })
}
//@route /api/admin/product/:category
//@method GET To get by category product
//@access private only admin
export const getProductByCategory = async (req, res) => {
    res.send(`Category name is ${req.params.category}`)
}
