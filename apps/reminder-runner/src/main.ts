import createDebug from 'debug'

import { findAndProcessDueReminders } from './findAndProcessDueReminders'

const debug = createDebug('hearye:runner:main')

let loop: ReturnType<typeof setTimeout>
const LOOP_LENGTH: number = parseInt(process.env.LOOP_LENGTH || '1000')

export async function main() {
  debug('Running runner loop')
  await findAndProcessDueReminders()
  loop = setTimeout(main, LOOP_LENGTH)
}

export function stop() {
  debug('Stopping loop')
  if (loop) clearTimeout(loop)
}
