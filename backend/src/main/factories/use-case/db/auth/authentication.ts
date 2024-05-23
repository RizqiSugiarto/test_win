import { Authentications } from "../../../../../data/use-cases/auth/authentication";
import { UserRepository } from "../../../../../infra/postgre_db/repository";
import { BcryptAdapter, JwtAdapter } from "../../../../../infra/cryptography";

export const makeAuthentications = (): Authentications => {
    const emailRepository = new UserRepository();
    const bcryptInfra = new BcryptAdapter(12); 
    const jwtInfra = new JwtAdapter("jancukkkk"); 
    return new Authentications(emailRepository, bcryptInfra, jwtInfra);
};