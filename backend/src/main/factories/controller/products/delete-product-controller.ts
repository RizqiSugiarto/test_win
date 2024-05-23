import { makeDbDeleteProduct } from "../../use-case/db";
import { DeleteProductController } from "../../../../presentation/controllers";

export const makeDbDeleteProductController = () => {
  const controller = new DeleteProductController(makeDbDeleteProduct());
  return controller;
};
