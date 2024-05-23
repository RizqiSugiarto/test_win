import { makeDbGetByEmailUser } from "../../use-case/db";
import { GetUserByEmailController } from "../../../../presentation/controllers";

export const makeDbGetByEmailUserController = () => {
  const controller = new GetUserByEmailController(makeDbGetByEmailUser());
  return controller;
};
