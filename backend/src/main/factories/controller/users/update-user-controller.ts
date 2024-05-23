import { makeDbUpdateUser } from "../../use-case/db";
import { UpdateUserController } from "../../../../presentation/controllers";

export const makeDbUpdateUserController = () => {
  const controller = new UpdateUserController(makeDbUpdateUser());
  return controller;
};
