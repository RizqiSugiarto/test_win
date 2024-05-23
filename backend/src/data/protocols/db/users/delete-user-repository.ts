import { DeleteAccount } from "../../../../domain/use-cases/users/deleteAccount";

export interface DeleteUserRepository {
    deleteUser: (params: DeleteAccount.Params) => Promise<DeleteAccount.Result>;
}

export namespace DeleteUserRepository {
    export type Params = DeleteAccount.Params;
    export type Result = DeleteAccount.Result;
}