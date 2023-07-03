import { Express } from "express";
import infoRouter from "./infoRouter.js";
import UserRouter from "./userRouter.ts";
import ProfileRouter from "./profileRouter.ts";
import { validateToken } from "../middlewares/validToken.ts";

const v1 = "/v1";

function routes(app: Express): void {
  app.use(`${v1}/info`, infoRouter);
  app.use(`${v1}/users`, UserRouter);
  app.use(`${v1}/profiles`, validateToken, ProfileRouter);
}

export default routes;
