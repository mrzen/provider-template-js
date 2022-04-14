import { createHmac } from "crypto"
import { Context, Next } from "koa"
import redis from "../util/redis"


export default async function providerAuthentication(ctx: Context, next: Next) {
    const { headers } = ctx.request

    if ( typeof(headers['x-request-signature']) === 'undefined') {
        ctx.status = 401
        ctx.body = { error: 'Authentication required' }
        return
    }

    const [credentialId, timestamp, signature] = (headers['x-request-signature'] as string).split(' ')

    // Get the credential
    const [ privateCredential, enabled ] = await redis.hmget(`credentials:${credentialId}`, 'private', 'enabled')

    if (!privateCredential || !parseInt(enabled, 10)) {
        ctx.status = 403
        ctx.body = { error: 'Invalid credentials' }
        return
    }

    const now = Date.now()
    const requestTimestamp = parseInt(timestamp, 10) * 1000

    if (Math.abs(now - requestTimestamp) > 300_000) {
        // Request is too old or in the future
        ctx.status = 401
        ctx.body = { error: 'Invalid timestamp' }
        return
    }

    const hmac = createHmac('sha256', privateCredential)
    hmac.write(timestamp)

    if (ctx.request.method === 'POST') {
        hmac.write(ctx.request.rawBody.slice(0, 1024))
    }

    const correctSignature = hmac.digest().toString('hex')
    const [_, givenSignature] = signature.split(':')

    if (givenSignature !== correctSignature) {
        ctx.status = 401
        ctx.body = { error: 'Invalid signature' }
        return
    }

    ctx.credential = credentialId

    await next()
}
