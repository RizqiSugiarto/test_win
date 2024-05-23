import { DbUpdateUser } from "../../../../../data/use-cases";
import { UserRepository } from "../../../../../infra/postgre_db/repository";

export const makeDbUpdateUser = (): DbUpdateUser => {
  const userRepository = new UserRepository();
  return new DbUpdateUser(userRepository);
};
