import { GetByIdProduct } from "../../../domain/use-cases";
import { GetByIdProductRepository } from "../../protocols";

export class DbGetByIdProduct implements GetByIdProduct {
  constructor(private readonly getByIdProductRepo: GetByIdProductRepository) {}

  perform = async (
    params: GetByIdProduct.Params,
  ): Promise<GetByIdProduct.Result | null> => {
    return await this.getByIdProductRepo.getByIdProduct(params);
  };
}
