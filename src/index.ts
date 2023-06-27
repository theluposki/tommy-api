import https from "node:https"
import app from './app.js'
import config from './config.js'

const server = https.createServer(config.certificates, app)

server.listen(config.app.PORT, () => {
  console.log(`[ APP ] Listening at 🚀${config.app.HOST}:${config.app.PORT}`)
})
