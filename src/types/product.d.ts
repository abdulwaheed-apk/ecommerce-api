import { Document, Types } from 'mongoose'

type ColorTypes = 'black' | 'white' | 'blue' | 'green' | 'red' | 'pink'
type VariationTypes = 'S' | 'M' | 'L' | 'XL' | 'XXL'

export interface IProduct extends Document {
    _id: Types.ObjectId
    name: string
    description: string
    product_image: string
    qty_in_stock: number
    sku: string
    price: number
    sale_price?: number
    category: 'men' | 'women'
    variation: ('S' | 'M' | 'L' | 'XL' | 'XXL')[]
    color: ColorTypes[]
    product_images: string[]
}

export interface CreateProductBody {
    name: string
    description: string
    product_image: string
    qty_in_stock: number
    sku: string
    price: number
    sale_price?: number
    category: 'men' | 'women'
    variation: VariationTypes[]
    color: ColorTypes[]
    product_images: string[]
}
export interface UpdateProductBody {
    name?: string
    description?: string
    product_image?: string
    qty_in_stock?: number
    price?: number
    sale_price?: number
    category?: 'men' | 'women'
    variation?: VariationTypes[]
    color?: ColorTypes[]
    product_images?: string[]
}
