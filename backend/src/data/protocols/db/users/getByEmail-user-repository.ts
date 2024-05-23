import { GetAccountByEmail } from "../../../../domain/use-cases/users/getAccountByEmail";

export interface GetByEmailUserRepository {
  getByEmail: (
    params: GetByEmailUserRepository.Params,
  ) => Promise<GetByEmailUserRepository.Result | null>;
}

export namespace GetByEmailUserRepository {
  export type Params = GetAccountByEmail.Params;
  export type Result = GetAccountByEmail.Result;
}
