// src/presentation/routes/infoRouter.ts
import { Router } from "express";
var router = Router();
router.get("/", (req, res) => {
  res.status(200).json({ status: "OK" });
});
var infoRouter_default = router;
export {
  infoRouter_default as default
};
//# sourceMappingURL=infoRouter.js.map