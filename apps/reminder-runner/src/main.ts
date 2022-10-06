import createDebug from 'debug'

import { findAndProcessDueReminders } from './findAndProcessDueReminders'

const debug = createDebug('hearye:runner:main')

let loop: ReturnType<typeof setTimeout>
const SLEEP: number = parseInt(process.env.LOOP_LENGTH || '1000')

export async function main() {
  debug('Running runner loop')
  const processed = await findAndProcessDueReminders()
  loop = setTimeout(main, processed === 0 ? SLEEP : 0)
}

export function stop() {
  debug('Stopping loop')
  if (loop) clearTimeout(loop)
}
