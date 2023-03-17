import { LogtailTransport } from '@logtail/winston'
import { Logtail } from '@logtail/node'
import winston, { transport } from 'winston'

import { DebugTransport } from './DebugTransport'

import { env } from '@hearye/env'

const { LOGTAIL_ENABLED, LOGTAIL_SOURCE_TOKEN, NODE_ENV, RENDER_GIT_COMMIT } =
  env

const logtailTransport =
  LOGTAIL_SOURCE_TOKEN && LOGTAIL_ENABLED
    ? new LogtailTransport(new Logtail(LOGTAIL_SOURCE_TOKEN))
    : false
declare module 'winston' {
  export interface Logger {
    fatal: winston.LeveledLogMethod
    warn: winston.LeveledLogMethod
    trace: winston.LeveledLogMethod
  }
}
export function createLogger(namespace: string) {
  const transports = [new DebugTransport({ namespace })] as [transport]
  if (logtailTransport) transports.push(logtailTransport)

  return winston.createLogger({
    level: env.NODE_ENV === 'test' ? 'none' : 'trace',
    levels: Object.assign(
      { fatal: 0, warn: 4, trace: 7 },
      winston.config.syslog.levels
    ),
    defaultMeta: {
      environment: NODE_ENV,
      release: RENDER_GIT_COMMIT,
      namespace,
    },
    format: winston.format.json(),
    transports,
  })
}
