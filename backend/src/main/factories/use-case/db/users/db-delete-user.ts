import { DbDeleteUser } from "../../../../../data/use-cases";
import { UserRepository } from "../../../../../infra/postgre_db/repository";

export const makeDbDeleteUser = (): DbDeleteUser => {
    const userRepository = new UserRepository();
    return new DbDeleteUser(userRepository);
};