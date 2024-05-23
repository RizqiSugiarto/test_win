import Swag from "../../../docs/swagger.json";
import { serve, setup } from "swagger-ui-express";
import { Express } from "express";

export const setupSwagger = (app: Express): void => {
  app.use("/api-docs", serve, setup(Swag));
};
