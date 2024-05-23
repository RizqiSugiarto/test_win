import { GetByIdProduct } from "../../../../domain/use-cases";

export interface GetByIdProductRepository {
  getByIdProduct: (
    params: GetByIdProductRepository.Params,
  ) => Promise<GetByIdProductRepository.Result | null>;
}

export namespace GetByIdProductRepository {
  export type Params = GetByIdProduct.Params;
  export type Result = GetByIdProduct.Result;
}
