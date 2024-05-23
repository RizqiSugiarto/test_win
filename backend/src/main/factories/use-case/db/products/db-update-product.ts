import { DbUpdateProduct } from "../../../../../data/use-cases";
import { ProductRepository } from "../../../../../infra/postgre_db/repository";

export const makeDbUpdateProduct = (): DbUpdateProduct => {
  const productRepository = new ProductRepository();
  return new DbUpdateProduct(productRepository);
};
