import { DbGetUserByEmail } from "../../../../../data/use-cases";
import { UserRepository } from "../../../../../infra/postgre_db/repository";

export const makeDbGetByEmailUser = (): DbGetUserByEmail => {
    const userRepository = new UserRepository();
    return new DbGetUserByEmail(userRepository);
};