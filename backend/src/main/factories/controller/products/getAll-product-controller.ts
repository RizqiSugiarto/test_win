import { makeDbGetAllProducts } from "../../use-case/db";
import { GetAllProductsController } from "../../../../presentation/controllers";

export const makeDbGetAllProductController = () => {
  const controller = new GetAllProductsController(makeDbGetAllProducts());
  return controller;
};
