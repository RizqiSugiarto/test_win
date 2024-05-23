import { UpdateProduct } from "../../../domain/use-cases";
import { Controller, HttpResponse } from "../../protocols";
import { HttpHelper } from "../../helpers";
import { MissingParametersError } from "../../error";

export class UpdateProductController implements Controller {
  constructor(private readonly updateProduct: UpdateProduct) {}

  handle = async (
    request: UpdateProductController.Request,
  ): Promise<HttpResponse<any>> => {
    try {
      const updateProduct = request;
      const requiredFields = updateProduct.id;
      if (!requiredFields)
        return HttpHelper.BAD_REQUEST(new MissingParametersError());
      const updatedProduct = await this.updateProduct.perform(request);
      return HttpHelper.CREATED(updatedProduct);
    } catch (error) {
      return HttpHelper.INTERNAL_SERVER_ERROR(error as Error);
    }
  };
}

export namespace UpdateProductController {
  export type Request = {
    id: string;
    nameProduct: string;
    price: number;
    photoProduct: string;
    description: string;
  };
}
