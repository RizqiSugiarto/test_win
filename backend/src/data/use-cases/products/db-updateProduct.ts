import { UpdateProduct } from "../../../domain/use-cases";
import { UpdateProductRepository } from "../../protocols";

export class DbUpdateProduct implements UpdateProduct {
    constructor(private readonly updateProductRepo: UpdateProductRepository) {}

    perform = async (params: UpdateProduct.Params): Promise<UpdateProduct.Result> => {
        return await this.updateProductRepo.updateProduct(params)
    }
}