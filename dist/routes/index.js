// src/routes/infoRouter.ts
import { Router } from "express";
var router = Router();
router.get("/", (req, res) => {
  res.status(200).json({ status: "OK" });
});
var infoRouter_default = router;

// src/routes/index.ts
var v1 = "/v1";
async function routes(app) {
  app.use(`${v1}/info`, infoRouter_default);
}
var routes_default = routes;
export {
  routes_default as default
};
//# sourceMappingURL=index.js.map