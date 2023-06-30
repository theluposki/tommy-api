import https from "node:https"
import http from "node:http"

import app from './app.js'
import config from './config.js'

console.log("\nPRODUCTION", config.production, "\n")

if(config.production === "true") {
  const server = http.createServer(app)

  server.listen(config.app.PORT, () => {
    console.log(`[ APP ] Listening at 🚀http://localhost:${config.app.PORT}`)
  })

} else {
  const options = config.certificates
  const server = https.createServer(options, app)

  server.listen(config.app.PORT, () => {
    console.log(`[ APP ] Listening at 🚀${config.app.HOST}:${config.app.PORT}`)
  })  
}





