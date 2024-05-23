import { AddAccount } from "../../../domain/use-cases";
import { CreateUserRepository } from "../../protocols";

export class DbCreateUser implements AddAccount {
    
    constructor(private readonly createUserRepo: CreateUserRepository){}

    perform = async (params: AddAccount.Params): Promise<AddAccount.Result> => {
        const createResult = await this.createUserRepo.createUser(params);
        return {id : createResult.id}
    }
}