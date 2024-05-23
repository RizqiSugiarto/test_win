import { GetAccountByEmail } from "../../../domain/use-cases";
import { Controller, HttpResponse } from "../../protocols";
import { HttpHelper } from "../../helpers";
import { MissingParametersError } from "../../error";

export class GetUserByEmailController implements Controller {
  constructor(private readonly getByEmailUser: GetAccountByEmail) {}
  handle = async (
    request: GetUserByEmailController.Request,
  ): Promise<HttpResponse<any>> => {
    try {
      const getUserByEmail = request;
      const requiredField = getUserByEmail.email;
      if (!requiredField)
        return HttpHelper.BAD_REQUEST(new MissingParametersError());
      const getResult = await this.getByEmailUser.perform(request);
      return HttpHelper.OK(getResult);
    } catch (error) {
      return HttpHelper.INTERNAL_SERVER_ERROR(error as Error);
    }
  };
}

export namespace GetUserByEmailController {
  export type Request = {
    email: string;
  };
}
