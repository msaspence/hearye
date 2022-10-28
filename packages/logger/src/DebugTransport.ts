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
    {
      level,
      message,
      stack,
    }: { level: string; message: string; stack: string[] },
    callback: () => void
  ) {
    const joinedStack = stack?.join ? stack?.join('\n') : stack
    this.debug(`${LEVEL_EMOJIS[level] || '  '} ${joinedStack || message}`)
    callback()
  }
}

const LEVEL_EMOJIS = {
  fatal: '💀',
  emerg: '🚑',
  alert: '📣',
  crit: '‼️ ',
  error: '🚨',
  warning: '⚠️ ',
  warn: '⚠️ ',
  notice: '📜',
  info: '💬',
  debug: '🪲 ',
  trace: '✏️ ',
} as Record<string, string>
