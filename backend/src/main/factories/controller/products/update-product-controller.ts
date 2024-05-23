import { makeDbUpdateProduct } from "../../use-case/db";
import { UpdateProductController } from "../../../../presentation/controllers";

export const makeDbUpdateProductController = () => {
  const controller = new UpdateProductController(makeDbUpdateProduct());
  return controller;
};
