import Transport from 'winston-transport'
import createDebug from 'debug'

export class DebugTransport extends Transport {
  debug: ReturnType<typeof createDebug>

  constructor({ namespace, ...options }: { namespace: string }) {
    super(options)
    this.debug = createDebug(namespace)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  log(
    { level, message }: { level: string; message: string },
    callback: () => void
  ) {
    this.debug(`${LEVEL_EMOJIS[level] || 'ℹ️'}  ${message}`)
    callback()
  }
}

const LEVEL_EMOJIS = {
  emerg: '🚑',
  alert: '📣',
  crit: '‼️',
  error: '🚨',
  warning: '⚠️',
  notice: '📜',
  info: 'ℹ️',
  debug: '🪲',
} as Record<string, string>
