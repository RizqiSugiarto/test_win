import { Router } from "express";

import { usersRoute } from "../routes";
import { productsRoute } from "../routes";

const router = Router();

router.use(usersRoute);
router.use(productsRoute);

export { router, usersRoute, productsRoute };