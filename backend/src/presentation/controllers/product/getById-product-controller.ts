import { GetByIdProduct } from "../../../domain/use-cases";
import { Controller, HttpResponse } from "../../protocols";
import { HttpHelper } from "../../helpers";
import { MissingParametersError } from "../../error";

export class GetProductByIdController implements Controller {
  constructor(private readonly getProductById: GetByIdProduct) {}

  handle = async (
    request: GetProductByIdController.Request,
  ): Promise<HttpResponse<any>> => {
    try {
      const getProduct = request;
      if (!getProduct)
        return HttpHelper.BAD_REQUEST(new MissingParametersError());
      const product = await this.getProductById.perform(getProduct);
      return HttpHelper.OK(product);
    } catch (error) {
      return HttpHelper.INTERNAL_SERVER_ERROR(error as Error);
    }
  };
}

export namespace GetProductByIdController {
  export type Request = {
    id: string;
  };
}
