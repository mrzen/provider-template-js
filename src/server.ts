/**
 * Application entry point for provider service server
 */

import Koa from 'koa'
import json from 'koa-json'
import bodyParser  from 'koa-bodyparser'

import { config } from 'dotenv'
import logger from './util/logger'
import router from './routes'
import loggingMiddleware from "./middleware/logger";

config()

const app = new Koa()


app.use(bodyParser())
app.use(json({pretty: false, param: '_p'}))
app.use(loggingMiddleware)

app.use(router.routes())


const port = process.env.PORT || 8088

logger.info(`Starting application on http://127.0.0.1:${port}`, { port })

app.listen(port)
