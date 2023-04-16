import original from 'dayjs'
import dayjsBusinessDays from 'dayjs-business-days2'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import type { Dayjs } from 'dayjs'
export type { Dayjs }

original.extend(dayjsBusinessDays)
original.extend(timezone)
original.extend(advancedFormat)
original.extend(utc)

export function dayjs(...args: Parameters<typeof original.utc>) {
  return original.utc(...args)
}

export function formatDate(date: Dayjs) {
  return dayjs(date).tz('Europe/London').format('Do MMMM YYYY')
}
