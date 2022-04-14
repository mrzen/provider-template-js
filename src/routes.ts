import KoaRouter from '@koa/router';
import { Context, Next } from 'koa';
import service_description from './service_description';
import providerAuthentication from './middleware/auth';

export type RouterFunc = (r: KoaRouter) => void

const router = new KoaRouter();

/**
 * Route to get the service description
 */
router.get('/service', providerAuthentication, (ctx: Context, next: Next) => {
    ctx.status = 200
    ctx.body = service_description
})

/**
 * Simple health-check endpoint
 */
router.get('/_healthz', (ctx: Context, next: Next) => {
    ctx.status = 200
    ctx.body = "OK\r\n"
})

export default router

// Add your routes here...
