import { GetAccountById } from "../../../../domain/use-cases";

export interface GetByIdUserRepository {
    getById: (params: GetByIdUserRepository.Params) => Promise<GetByIdUserRepository.Result | null>;
}

export namespace GetByIdUserRepository {
    export type Params = GetAccountById.Params;
    export type Result = GetAccountById.Result;
};