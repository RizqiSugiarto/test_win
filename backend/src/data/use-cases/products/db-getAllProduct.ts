import { GetAllProduct } from "../../../domain/use-cases";
import { GetAllProductRepository } from "../../protocols";

export class DbGetAllProduct implements GetAllProduct {
    constructor(private readonly getAllProductRepo: GetAllProductRepository) {}

    perform = async (): Promise<GetAllProduct.Result[]> => {
        return await this.getAllProductRepo.getAllProduct()
    }
}