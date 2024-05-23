import { GetAllProduct } from "../../../../domain/use-cases";

export interface GetAllProductRepository {
  getAllProduct: () => Promise<GetAllProductRepository.Result[]>;
}

export namespace GetAllProductRepository {
  export type Result = GetAllProduct.Result;
}
