import { DeleteProduct } from "../../../../domain/use-cases";

export interface DeleteProductRepository {
    deleteProduct: (params: DeleteProductRepository.Params) => Promise<DeleteProductRepository.Result>;
}

export namespace DeleteProductRepository {
    export type Params = DeleteProduct.Params;
    export type Result = DeleteProduct.Result;
}