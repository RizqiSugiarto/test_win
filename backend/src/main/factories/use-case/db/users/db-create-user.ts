import { DbCreateUser } from "../../../../../data/use-cases";
import { UserRepository } from "../../../../../infra/postgre_db/repository";

export const makeDbCreateUser = (): DbCreateUser => {
    const userRepository = new UserRepository();
    return new DbCreateUser(userRepository);
};