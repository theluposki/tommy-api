import infoRouter from "./infoRouter.js";

const v1 = "/v1";

function routes(app) {
  app.use(`${v1}/info`, infoRouter);
}

export default routes;
