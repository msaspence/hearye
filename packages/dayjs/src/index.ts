import original from 'dayjs'
import dayjsBusinessDays from 'dayjs-business-days2'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

original.extend(dayjsBusinessDays)
original.extend(timezone)
original.extend(utc)

export function dayjs(...args: Parameters<typeof original.utc>) {
  return original.utc(...args)
}
