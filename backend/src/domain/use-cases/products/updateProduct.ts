
export interface UpdateProduct{
    perform: (params: UpdateProduct.Params) => Promise<UpdateProduct.Result>;
}

export namespace UpdateProduct {
    export type Params = {
        id: string,
        nameProduct: string,
        price: number,
        photoProduct: string,
        description: string,
    };
    export type Result = {
        id: string,
        nameProduct: string,
        price: number,
        photoProduct: string,
        description: string,
        created_at: Date,
        updated_at: Date | null,
    };
}