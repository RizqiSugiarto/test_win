import { DeleteProduct } from "../../../domain/use-cases";
import { Controller, HttpResponse } from "../../protocols";
import { HttpHelper } from "../../helpers";
import { MissingParametersError } from "../../error";

export class DeleteProductController implements Controller {
    constructor(private readonly deleteProduct: DeleteProduct) {}

    handle = async (request: DeleteProductController.Request): Promise<HttpResponse<any>> => {
        try {
            const deletedProduct = request;
            if (!deletedProduct) return HttpHelper.BAD_REQUEST(new MissingParametersError());
            const getResult = await this.deleteProduct.perform(deletedProduct);
            return HttpHelper.OK({productId:getResult.id});
        } catch (error) {
            return HttpHelper.INTERNAL_SERVER_ERROR(error as Error);
        }
    };
}

export namespace DeleteProductController {
    export type Request = {
        id: string;
    };
}
