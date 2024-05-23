import { GetAccountById } from "../../../domain/use-cases";
import { Controller, HttpResponse } from "../../protocols";
import { HttpHelper } from "../../helpers";
import { MissingParametersError } from "../../error";


export class GetUserByIdController implements Controller {
    constructor(private readonly getByIdUser: GetAccountById){}
    handle = async (request: GetUserByIdController.Request): Promise<HttpResponse<any>> => {
        console.log(request, "PARAMETER CTRL USERID")
        try {
            const getUserById = request;
            const requiredField = getUserById.id
            if(!requiredField) return HttpHelper.BAD_REQUEST(new MissingParametersError());
            const getResult = await this.getByIdUser.perform(request);
            return HttpHelper.OK(getResult);
        } catch (error) {
            return HttpHelper.INTERNAL_SERVER_ERROR(error as Error)
        }
    };
}

export namespace GetUserByIdController {
    export type Request = {
      id: string;
    };
  }