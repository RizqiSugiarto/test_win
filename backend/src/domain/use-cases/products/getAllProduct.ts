export interface GetAllProduct{
    perform: () => Promise<GetAllProduct.Result[]>;
}

export namespace GetAllProduct {
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