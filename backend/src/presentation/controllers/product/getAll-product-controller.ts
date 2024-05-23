import { GetAllProduct } from "../../../domain/use-cases";
import { Controller, HttpResponse } from "../../protocols";
import { HttpHelper } from "../../helpers";

export class GetAllProductsController implements Controller {
  constructor(private readonly getAllProducts: GetAllProduct) {}

  handle = async (): Promise<HttpResponse<any>> => {
    try {
      const products = await this.getAllProducts.perform();
      return HttpHelper.OK(products);
    } catch (error) {
      return HttpHelper.INTERNAL_SERVER_ERROR(error as Error);
    }
  };
}
