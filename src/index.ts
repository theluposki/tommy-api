import https from "node:https";
import http from "node:http";

import app from "./app.js";
import config from "./config.js";

console.log("\nPRODUCTION", config.production, "\n");

const serverHttp = http.createServer(app);

const options = config.certificates;
const serverHttps = https.createServer(options, app);

if (config.production === "true") {
  serverHttp.listen(config.app.PORT, () => {
    console.log(`[ APP ] Listening at 🚀http://localhost:${config.app.PORT}`);
  });
} else {
  serverHttps.listen(config.app.PORT, () => {
    console.log(`[ APP ] Listening at 🚀${config.app.HOST}:${config.app.PORT}`);
  });
}

export { serverHttps }
