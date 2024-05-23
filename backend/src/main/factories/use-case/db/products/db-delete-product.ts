import { DbDeleteProduct } from "../../../../../data/use-cases";
import { ProductRepository } from "../../../../../infra/postgre_db/repository";

export const makeDbDeleteProduct = (): DbDeleteProduct => {
  const productRepository = new ProductRepository();
  return new DbDeleteProduct(productRepository);
};
