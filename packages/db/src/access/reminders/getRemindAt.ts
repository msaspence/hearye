import { dayjs } from '@hearye/dayjs'

export function getRemindAt(_iteration: number, timezone: string) {
  return dayjs()
    .tz(timezone)
    .businessDaysAdd(1)
    .hour(10)
    .minute(Math.round(Math.random() * 59))
    .second(0)
    .millisecond(0)
    .toDate()
}
