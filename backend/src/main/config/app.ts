import cors from "cors";
import express from "express";
import session from "express-session"

import { router } from "./router";

export const App = () => {
  const app = express();
  app.use(express.json());
  app.use(cors({credentials: true, origin: true}));
  app.set('trust proxy', 1) 
  app.use(session({
    secret:"cobalahMengerti",
    resave: false,
    saveUninitialized: true,
    cookie: {secure: true}
  }))
  app.use(router);
  return app;
};