
export interface GetByIdProduct{
    perform: (params: GetByIdProduct.Params) => Promise<GetByIdProduct.Result | null>;
}

export namespace GetByIdProduct {
    export type Params = {
        id:string,
    };
    export type Result = {
        id: string
        nameProduct: string,
        price: number,
        photoProduct: string,
        description: string,
        created_at: Date,
        updated_at: Date | null,
    };
}