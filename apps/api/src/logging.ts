import plugin from 'fastify-plugin'
import {
  FastifyBaseLogger,
  FastifyInstance,
  FastifyTypeProviderDefault,
  RawServerDefault,
  FastifyRequest,
} from 'fastify'
import { IncomingMessage, ServerResponse } from 'http'
import { createLogger } from '@hearye/logger'

const logger = createLogger('hearye:api:fastify')

declare module 'fastify' {
  interface FastifyReply {
    startTime: number
  }
}

export const logging = plugin(
  async (
    fastify: FastifyInstance<
      RawServerDefault,
      IncomingMessage,
      ServerResponse<IncomingMessage>,
      FastifyBaseLogger,
      FastifyTypeProviderDefault
    >
  ) => {
    fastify.addHook('onRequest', async (request: FastifyRequest, response) => {
      const requestMeta = requestLogData(request)
      response.startTime = Date.now()
      logger.info(`REQ ${requestMeta.method} ${request.raw.url}`)
    })

    fastify.addHook('onResponse', async (request: FastifyRequest, response) => {
      const requestMeta = requestLogData(request)
      const statusCode = response.raw.statusCode
      logger.info(`${statusCode} ${requestMeta.method} ${request.raw.url}`, {
        ...requestMeta,
        statusCode,
        durationMs: Date.now() - response.startTime, // recreate duration in ms - use process.hrtime() - https://nodejs.org/api/process.html#process_process_hrtime_bigint for most accuracy
      })
    })

    fastify.addHook('onError', async (request, response, error) => {
      logger.error(error.toString(), {
        ...error,
        stack: error.stack?.split('\n'),
      })
    })
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    fastify.setNotFoundHandler()
  }
)

function requestLogData({
  hostname,
  id,
  method,
  query,
  protocol,
  raw: { url },
}: {
  hostname: string
  id: string
  method: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  query: unknown
  protocol: string
  raw: { url?: string }
}) {
  const { pathname } = new URL(url || '/', `${protocol}://${hostname}`)
  return {
    hostname,
    query: { ...(query as Record<string, unknown>) },
    protocol,
    method,
    pathname,
    url,
    id,
  }
}
