import { UpdateAccount } from "../../../../domain/use-cases/users/updateAccount";

export interface UpdateUserRepository {
    updateUser: (params: UpdateUserRepository.Params) => Promise<UpdateUserRepository.Result>;
}

export namespace UpdateUserRepository {
    export type Params = UpdateAccount.Params;
    export type Result = UpdateAccount.Result;
}