import { Router } from "express";

import { expressRouterAdapter } from "../adapter";
import { 
    makeDbCreateProductController,
    makeDbUpdateProductController,
    makeDbGetAllProductController,
    makeDbGetByIdProductController,
    makeDbDeleteProductController 
} from "../factories/controller";
import { auth } from "../middlewares/auth";

const productsRoute = Router();

productsRoute.post("/products", expressRouterAdapter(makeDbCreateProductController()));
productsRoute.put("/products/:id", expressRouterAdapter(makeDbUpdateProductController()));
productsRoute.get("/products", auth,expressRouterAdapter(makeDbGetAllProductController()));
productsRoute.get("/products/:id", expressRouterAdapter(makeDbGetByIdProductController()));
productsRoute.delete("/products/:id", expressRouterAdapter(makeDbDeleteProductController()));

export { productsRoute };
