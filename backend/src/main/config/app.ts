import cors from "cors";
import express from "express";
import { setupSwagger } from "./swagger";
import { router } from "./router";

export const App = () => {
  const app = express();
  app.use(express.json());
  app.use(cors({credentials: true, origin: true}));
  app.set('trust proxy', 1);
  app.use(router);
  setupSwagger(app)
  return app;
};