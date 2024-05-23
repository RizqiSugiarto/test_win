// import { Env } from '../../../../config'
import { LoadAccountByToken } from "../../../../../domain/use-cases";
import { LoadAccountByTokens } from "../../../../../data/use-cases";
import { JwtAdapter } from "../../../../../infra/cryptography";

export const makeLoadAccountByTokens = (): LoadAccountByToken => {
  // const jwtSecret = Env.JWTSECRET
  // if (!jwtSecret) throw new Error('JWTSECRET is not defined')
  const jwtAdapter = new JwtAdapter("jancukkkk");
  return new LoadAccountByTokens(jwtAdapter);
};
