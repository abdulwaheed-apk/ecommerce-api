import { Request, Response } from 'express'
import { Product } from '../models/productMode'
import { CreateProductBody } from '../types/Product'

//@route /api/v1/admin/product
//@method POST To create product
//@access private only admin
export const createProduct = async (
    req: Request<{}, {}, CreateProductBody>,
    res: Response
) => {
    try {
        const productData: CreateProductBody = req.body
        const product = await Product.create(productData)

        return res.status(201).json({
            message: 'Product created successfully',
            product,
        })
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: `Server Error: ${error.message}` })
        } else {
            res.status(500).json({ message: 'An unknown error occurred' })
        }
    }
}
//@route /api/v1/admin/product/:id
//@method DELETE To delete product
//@access private only admin
export const deleteProduct = async (req: Request, res: Response) => {
    try {
        const product = await Product.findById(req.params.id)
        if (!product) {
            return res.status(404).json({ message: 'Product not found' })
        }
        await Product.findByIdAndDelete(req.params.id)

        return res.status(200).json({ message: 'Product Deleted Successfully' })
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: `Server Error: ${error.message}` })
        } else {
            res.status(500).json({ message: 'An unknown error occurred' })
        }
    }
}
//@route /api/v1/admin/product/:id
//@method PATCH To update product
//@access private only admin
export const updateProduct = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const updates = req.body
        const updatedProduct = await Product.findByIdAndUpdate(id, updates, {
            new: true,
            runValidators: true,
        })
        if (!updatedProduct) {
            return res.status(404).json({ message: 'Products not found' })
        }
        return res.status(200).json({
            message: 'Product updated successfully',
            updateProduct,
        })
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: `Server Error: ${error.message}` })
        } else {
            res.status(500).json({ message: 'An unknown error occurred' })
        }
    }
}
//@route /api/v1/products
//@method GET To get all product
//@access public
export const getAllProducts = async (req: Request, res: Response) => {
    try {
        const products = await Product.find({})

        if (products.length === 0) {
            return res.status(404).json({ message: 'Products not found' })
        }

        return res
            .status(200)
            .json({ message: 'Got all products successfully', products })
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: `Server Error: ${error.message}` })
        } else {
            res.status(500).json({ message: 'An unknown error occurred' })
        }
    }
}
//@route /api/v1/products/:category
//@method GET To get by category product
//@access public
export const getProductByCategory = async (req: Request, res: Response) => {
    try {
        const { category } = req.params
        const products = await Product.find({ category: category })

        if (products.length === 0) {
            return res
                .status(404)
                .json({ message: `${category} products not found` })
        }

        return res.status(200).json({
            message: `Got all products for ${category} category`,
            products,
        })
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: `Server Error: ${error.message}` })
        } else {
            res.status(500).json({ message: 'An unknown error occurred' })
        }
    }
}
