import { Authentication } from "../../../domain/use-cases";
import { Controller, HttpResponse } from "../../protocols";
import { HttpHelper} from "../../helpers";
import { MissingParametersError } from "../../error";


export class LoginUserController implements Controller {
    constructor(private readonly authUser: Authentication){}
    handle = async (request: Authentication.Params): Promise<HttpResponse<any>> => {
        try {
            const AuthenUser = request;
            const requiredField = AuthenUser.email && AuthenUser.password;
            if(!requiredField) return HttpHelper.BAD_REQUEST(new MissingParametersError());
            const getResult = await this.authUser.auth(request)
            return HttpHelper.CREATED(getResult);
        } catch (error) {
            return HttpHelper.INTERNAL_SERVER_ERROR(error as Error)
        }
    };
}

export namespace LoginUserController {
    export type Request = {
      email: string,
      password: string
    };
}