import { AddProduct } from "../../../domain/use-cases";
import { Controller, HttpResponse } from "../../protocols";
import { HttpHelper } from "../../helpers";
import { MissingParametersError } from "../../error";

export class CreateProductController implements Controller {
  constructor(private readonly addProduct: AddProduct) {}

  handle = async (
    request: CreateProductController.Request,
  ): Promise<HttpResponse<any>> => {
    console.log(request, "GINI");
    try {
      const createProduct = request;
      const requiredFields =
        createProduct.nameProduct &&
        createProduct.price &&
        createProduct.photoProduct &&
        createProduct.description;
      if (!requiredFields)
        return HttpHelper.BAD_REQUEST(new MissingParametersError());

      const getResult = await this.addProduct.perform(createProduct);
      return HttpHelper.CREATED({ productId: getResult.id });
    } catch (error) {
      console.log(error, "GINIHH");
      return HttpHelper.INTERNAL_SERVER_ERROR(error as Error);
    }
  };
}

export namespace CreateProductController {
  export type Request = {
    nameProduct: string;
    price: number;
    photoProduct: string;
    description: string;
  };
}
