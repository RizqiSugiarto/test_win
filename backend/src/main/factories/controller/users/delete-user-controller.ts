import { makeDbDeleteUser } from "../../use-case/db";
import { DeleteUserController } from "../../../../presentation/controllers";

export const makeDbDeleteUserController = () => {
  const controller = new DeleteUserController(makeDbDeleteUser());
  return controller;
};
