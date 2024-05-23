import { makeDbGetByIdUser } from "../../use-case/db/users/db-getById-user";
import { GetUserByIdController } from "../../../../presentation/controllers";

export const makeDbGetByIdUserController = () => {
  const controller = new GetUserByIdController(makeDbGetByIdUser());
  return controller;
};
