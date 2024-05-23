import { Router } from "express";

import { expressRouterAdapter } from "../adapter";
import { auth } from "../middlewares/auth";
import { 
    makeDbCreateUserController,
    makeDbUpdateUserController,
    makeDbGetByEmailUserController,
    makeDbDeleteUserController,
    makeLoginUserController,
    makeDbGetByIdUserController
} from "../factories/controller";

const usersRoute = Router();

usersRoute.post("/users", expressRouterAdapter(makeDbCreateUserController()));
usersRoute.post("/users/login", expressRouterAdapter(makeLoginUserController()));
usersRoute.put("/users/:id", auth, expressRouterAdapter(makeDbUpdateUserController()));
usersRoute.get("/users/:id", auth, expressRouterAdapter(makeDbGetByIdUserController()));
usersRoute.get("/users/:email", auth, expressRouterAdapter(makeDbGetByEmailUserController()));
usersRoute.delete("/users/:id", auth,expressRouterAdapter(makeDbDeleteUserController()));

export {usersRoute};