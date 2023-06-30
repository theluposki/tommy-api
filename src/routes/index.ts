import { Express } from "express";
import infoRouter from "./infoRouter.js";
import UserRouter from "./UserRouter.ts"

const v1 = "/v1";

function routes(app: Express): void {
  app.use(`${v1}/info`, infoRouter);
  app.use(`${v1}/users`, UserRouter);
}

export default routes;
