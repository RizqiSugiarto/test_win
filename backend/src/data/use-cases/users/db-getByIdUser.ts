import { GetAccountById } from "../../../domain/use-cases";
import { GetByIdUserRepository } from "../../protocols";

export class DbGetByIdUser implements GetAccountById {
  constructor(private readonly getByIdUserRepo: GetByIdUserRepository) {}

  perform = async (
    params: GetAccountById.Params,
  ): Promise<GetAccountById.Result | null> => {
    return await this.getByIdUserRepo.getById(params);
  };
}
