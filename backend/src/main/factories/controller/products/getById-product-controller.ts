import { makeDbGetByIdProduct } from "../../use-case/db";
import { GetProductByIdController } from "../../../../presentation/controllers";

export const makeDbGetByIdProductController = () => {
  const controller = new GetProductByIdController(makeDbGetByIdProduct());
  return controller;
};
