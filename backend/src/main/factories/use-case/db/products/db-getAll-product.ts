import { DbGetAllProduct } from "../../../../../data/use-cases";
import { ProductRepository } from "../../../../../infra/postgre_db/repository";

export const makeDbGetAllProducts = (): DbGetAllProduct => {
    const productRepository = new ProductRepository();
    return new DbGetAllProduct(productRepository);
};