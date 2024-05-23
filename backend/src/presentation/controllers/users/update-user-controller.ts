import { UpdateAccount } from "../../../domain/use-cases";
import { Controller, HttpResponse } from "../../protocols";
import { HttpHelper } from "../../helpers";
import { MissingParametersError } from "../../error";

export class UpdateUserController implements Controller {
  constructor(private readonly updateAccount: UpdateAccount) {}
  handle = async (
    request: UpdateUserController.Request,
  ): Promise<HttpResponse<any>> => {
    try {
      const updateUser = request;
      const requiredField = updateUser.id;
      if (!requiredField)
        return HttpHelper.BAD_REQUEST(new MissingParametersError());
      const getResult = await this.updateAccount.perform(updateUser);
      return HttpHelper.CREATED(getResult);
    } catch (error) {
      return HttpHelper.INTERNAL_SERVER_ERROR(error as Error);
    }
  };
}

export namespace UpdateUserController {
  export type Request = {
    id: string;
    name: string;
    email: string;
    password: string;
    photoProfile: string;
  };
}
