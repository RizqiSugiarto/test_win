import { DeleteProduct } from "../../../domain/use-cases";
import { DeleteProductRepository } from "../../protocols";

export class DbDeleteProduct implements DeleteProduct {
  constructor(private readonly deleteProductRepo: DeleteProductRepository) {}

  perform = async (
    params: DeleteProduct.Params,
  ): Promise<DeleteProduct.Result> => {
    return await this.deleteProductRepo.deleteProduct(params);
  };
}
