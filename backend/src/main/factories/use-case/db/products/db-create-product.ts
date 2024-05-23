import { DbCreateProduct } from "../../../../../data/use-cases";
import { ProductRepository } from "../../../../../infra/postgre_db/repository";

export const makeDbCreateProduct = (): DbCreateProduct => {
  const productRepository = new ProductRepository();
  return new DbCreateProduct(productRepository);
};
