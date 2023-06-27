import { Express } from "express";
import infoRouter from "./infoRouter.js";

const v1 = "/v1";

function routes(app: Express): void {
  app.use(`${v1}/info`, infoRouter);
}

export default routes;
