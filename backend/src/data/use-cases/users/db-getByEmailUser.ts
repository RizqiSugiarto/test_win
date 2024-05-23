import { GetAccountByEmail } from "../../../domain/use-cases";
import { GetByEmailUserRepository } from "../../protocols";

export class DbGetUserByEmail implements GetAccountByEmail {
  constructor(private readonly getUserByEmailRepo: GetByEmailUserRepository) {}

  perform = async (
    params: GetAccountByEmail.Params,
  ): Promise<GetAccountByEmail.Result | null> => {
    return await this.getUserByEmailRepo.getByEmail(params);
  };
}
