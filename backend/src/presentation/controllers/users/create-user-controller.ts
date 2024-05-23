import { AddAccount } from "../../../domain/use-cases";
import { Controller, HttpResponse } from "../../protocols";
import { HttpHelper, PasswordHeplper } from "../../helpers";
import { MissingParametersError } from "../../error";


export class CreateUserController implements Controller {
    constructor(private readonly addUser: AddAccount){}
    handle = async (request: CreateUserController.Request): Promise<HttpResponse<any>> => {
        console.log(request)
        try {
            const createUser = request;
            const requiredField = createUser.name && createUser.email && createUser.password;
            if(!requiredField) return HttpHelper.BAD_REQUEST(new MissingParametersError());
            createUser.password = await PasswordHeplper.hashPassword(createUser.password);
            const getResult = await this.addUser.perform(createUser);
            return HttpHelper.CREATED({userId: getResult.id});
        } catch (error) {
            console.log(error)
            return HttpHelper.INTERNAL_SERVER_ERROR(error as Error)
        }
    };
}

export namespace CreateUserController {
    export type Request = {
      name: string;
      email: string;
      password: string;
      gender: string;
      photo_profile: string
    };
}