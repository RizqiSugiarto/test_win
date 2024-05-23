import { UpdateAccount } from "../../../domain/use-cases";
import { UpdateUserRepository } from "../../protocols";

export class DbUpdateUser implements UpdateAccount {
    constructor(private readonly updateUserRepo: UpdateUserRepository){}

    perform = async (params: UpdateAccount.Params): Promise<UpdateAccount.Result> => {
        return await this.updateUserRepo.updateUser(params)
    }
}