import express from 'express'
import cors from 'cors'
import config from './config.js'
import cookieParser from 'cookie-parser';
import routes from './routes/index.js'

const app = express()

app.use(cors(config.cors))
app.use(cookieParser());
app.use(express.json())
app.use('/', express.static('src/public'))

await routes(app)

export default app
