import { makeDbCreateUser } from "../../use-case/db";
import { CreateUserController } from "../../../../presentation/controllers";

export const makeDbCreateUserController = () => {
  const controller = new CreateUserController(makeDbCreateUser());
  return controller;
};
