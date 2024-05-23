import { DeleteAccount } from "../../../domain/use-cases";
import { DeleteUserRepository } from "../../protocols/db/users/delete-user-repository";

export class DbDeleteUser implements DeleteAccount {
  constructor(private readonly deleteUserRepo: DeleteUserRepository) {}

  perform = async (
    params: DeleteAccount.Params,
  ): Promise<DeleteAccount.Result> => {
    return await this.deleteUserRepo.deleteUser(params);
  };
}
