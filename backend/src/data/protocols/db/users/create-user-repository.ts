import { AddAccount } from "../../../../domain/use-cases/users/addAcount";

export interface CreateUserRepository {
  createUser: (
    params: CreateUserRepository.Params,
  ) => Promise<CreateUserRepository.Result>;
}

export namespace CreateUserRepository {
  export type Params = AddAccount.Params;
  export type Result = AddAccount.Result;
}
