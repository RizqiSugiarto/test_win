import { UpdateProduct } from "../../../../domain/use-cases";

export interface UpdateProductRepository {
    updateProduct: (params: UpdateProductRepository.Params) => Promise<UpdateProductRepository.Result>;
}

export namespace UpdateProductRepository {
    export type Params = UpdateProduct.Params;
    export type Result = UpdateProduct.Result;
}