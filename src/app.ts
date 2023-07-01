import express, { Express } from 'express'
import cors from 'cors'
import config from './config.js'
import cookieParser from 'cookie-parser';
import routes from './routes/index.ts'
import { errorHandlerJSON } from './middlewares/JSONFormat.ts';
const app:Express = express()

app.use(cors(config.cors))
app.use(cookieParser());
app.use(express.json())
app.use(errorHandlerJSON)
app.use('/', express.static('src/public'))

routes(app)

export default app
