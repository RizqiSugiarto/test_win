import { DeleteAccount } from "../../../domain/use-cases";
import { Controller, HttpResponse } from "../../protocols";
import { HttpHelper } from "../../helpers";
import { MissingParametersError } from "../../error";


export class DeleteUserController implements Controller {
    constructor(private readonly deleteUser: DeleteAccount){}
    handle = async (request: DeleteUserController.Request): Promise<HttpResponse<any>> => {
        try {
            const deletedUser = request;
            const requiredField = request.id;
            if(!requiredField) return HttpHelper.BAD_REQUEST(new MissingParametersError());
            const getResult = await this.deleteUser.perform(deletedUser);
            return HttpHelper.OK({userId:getResult.id});
        } catch (error) {
            return HttpHelper.INTERNAL_SERVER_ERROR(error as Error)
        }
    };
}

export namespace DeleteUserController {
    export type Request = {
      id: string;
    };
  }