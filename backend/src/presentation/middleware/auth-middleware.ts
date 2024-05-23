import { Middleware, HttpResponse } from "../protocols";
import { HttpHelper, CleanJwtToken } from "../helpers";
import { AccessDeniedError } from "../error";
import { LoadAccountByToken } from "../../domain/use-cases";

export class AuthMiddleware implements Middleware {
  constructor(private readonly loadAccountByToken: LoadAccountByToken) {}

  async handle(request: AuthMiddleware.Request): Promise<HttpResponse<any>> {
    try {
      console.log(request, "GINI");
      const { authorization } = request;
      console.log(authorization, "KETANGKEP KOK");
      if (authorization) {
        const cleanedToken = CleanJwtToken.cleanToken(authorization);
        const account = await this.loadAccountByToken.load(cleanedToken);
        if (account) {
          return HttpHelper.OK({ accountId: account.id });
        }
      }

      return HttpHelper.FORBIDEN(new AccessDeniedError());
    } catch (error) {
      console.log(error);
      return HttpHelper.INTERNAL_SERVER_ERROR(error as Error);
    }
  }
}

export namespace AuthMiddleware {
  export type Request = {
    authorization: string;
  };
}
