export interface IProduct {
    id: string
    nameProduct: string
    price: number
    photoProduct: string
    description: string
    created_at: Date
    updated_at: Date
}

export interface NewProduct {
    nameProduct: string
    price: number
    photoProduct: string
    description: string
}
