import { DbGetByIdUser } from "../../../../../data/use-cases/users/db-getByIdUser";
import { UserRepository } from "../../../../../infra/postgre_db/repository";

export const makeDbGetByIdUser = (): DbGetByIdUser => {
  const userRepository = new UserRepository();
  return new DbGetByIdUser(userRepository);
};
