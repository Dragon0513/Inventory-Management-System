export interface Category {
    id: number
    attributes: {
        name: string
    }
}
export interface Categories {
    data: Category[]
}
export interface Product {
    id: number
    attributes: {
        name: string
        price: number
        quantity: number
        description: string
        categories: Categories
        image: string
    }
}
export interface ProductType {
    data: Product[]
}
