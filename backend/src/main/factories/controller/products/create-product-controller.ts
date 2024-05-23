import { makeDbCreateProduct } from "../../use-case/db";
import { CreateProductController } from "../../../../presentation/controllers";

export const makeDbCreateProductController = () => {
  const controller = new CreateProductController(makeDbCreateProduct());
  return controller;
};
