import { Context, Next } from 'koa';
import logger from '../util/logger'

export default async function loggingMiddleware(ctx: Context, next: Next) {
    const start = Date.now()

    await next()

    const time = Date.now() - start

    logger.info(`${ctx.method} ${ctx.url} ${ctx.status} ${time}`, {
        method: ctx.method,
        url: ctx.url,
        status: ctx.status,
        respone_time: time
    })
}
