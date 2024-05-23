import { makeAuthentications } from "../../use-case/db";
import { LoginUserController } from "../../../../presentation/controllers/users/login-user-controller";

export const makeLoginUserController = () => {
  const controller = new LoginUserController(makeAuthentications());
  return controller;
};
