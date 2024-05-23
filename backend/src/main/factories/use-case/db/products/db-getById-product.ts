import { DbGetByIdProduct } from "../../../../../data/use-cases";
import { ProductRepository } from "../../../../../infra/postgre_db/repository";

export const makeDbGetByIdProduct = (): DbGetByIdProduct => {
    const productRepository = new ProductRepository();
    return new DbGetByIdProduct(productRepository);
};