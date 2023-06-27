// src/index.ts
import https from "https";

// src/app.ts
import express from "express";
import cors from "cors";

// src/config.ts
import dotenv from "dotenv";
import { readFileSync } from "fs";
dotenv.config();
var config_default = {
  certificates: {
    key: readFileSync("./server.key"),
    cert: readFileSync("./server.crt")
  },
  app: {
    PORT: process.env.PORT ?? 3002,
    HOST: process.env.HOST,
    baseUrl: process.env.BASE_URL
  },
  cors: {
    origin: "https://localhost:5173",
    credentials: true
  },
  mariadb: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT,
    connectionLimit: 5
  }
};

// src/app.ts
import cookieParser from "cookie-parser";

// src/routes/infoRouter.ts
import { Router } from "express";
var router = Router();
router.get("/", (req, res) => {
  res.status(200).json({ status: "OK" });
});
var infoRouter_default = router;

// src/routes/index.ts
var v1 = "/v1";
async function routes(app2) {
  app2.use(`${v1}/info`, infoRouter_default);
}
var routes_default = routes;

// src/app.ts
var app = express();
app.use(cors(config_default.cors));
app.use(cookieParser());
app.use(express.json());
app.use("/", express.static("src/public"));
await routes_default(app);
var app_default = app;

// src/index.ts
var server = https.createServer(config_default.certificates, app_default);
server.listen(config_default.app.PORT, () => {
  console.log(`[ APP ] Listening at \u{1F680}${config_default.app.HOST}:${config_default.app.PORT}`);
});
//# sourceMappingURL=index.js.map