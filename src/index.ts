import https from "node:https"
import app from './app.js'
import config from './config.js'

console.log("\nPRODUCTION", config.production, "\n")

const options = config.production === 'true' ? {} : config.certificates

const server = https.createServer(options, app)

server.listen(config.app.PORT, () => {
  console.log(`[ APP ] Listening at 🚀${config.app.HOST}:${config.app.PORT}`)
})
