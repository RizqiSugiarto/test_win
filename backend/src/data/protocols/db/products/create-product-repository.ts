import { AddProduct } from "../../../../domain/use-cases";

export interface CreateProductRepository {
  createProduct: (
    params: CreateProductRepository.Params,
  ) => Promise<CreateProductRepository.Result>;
}

export namespace CreateProductRepository {
  export type Params = AddProduct.Params;
  export type Result = AddProduct.Result;
}
