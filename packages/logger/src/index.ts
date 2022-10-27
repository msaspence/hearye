import { LogtailTransport } from '@logtail/winston'
import { Logtail } from '@logtail/node'
import winston from 'winston'

import { DebugTransport } from './DebugTransport'

import { LOGTAIL_SOURCE_TOKEN, NODE_ENV, RENDER_GIT_COMMIT } from '@hearye/env'

const logtailTransport = new LogtailTransport(new Logtail(LOGTAIL_SOURCE_TOKEN))

export function createLogger(namespace: string) {
  return winston.createLogger({
    defaultMeta: {
      environment: NODE_ENV,
      release: RENDER_GIT_COMMIT,
      namespace,
    },
    format: winston.format.json(),
    transports: [logtailTransport, new DebugTransport({ namespace })],
  })
}
