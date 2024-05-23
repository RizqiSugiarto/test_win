import { AddProduct } from "../../../domain/use-cases";
import { CreateProductRepository } from "../../protocols";

export class DbCreateProduct implements AddProduct {
    constructor(private readonly createProductRepo: CreateProductRepository) {}

    perform = async (params: AddProduct.Params): Promise<AddProduct.Result> => {
        return await this.createProductRepo.createProduct(params)
    }
}