import { describe, expect, it, vi, beforeEach } from 'vitest'

import type { Reminder } from '@hearye/db'

const reminders: Reminder[] = [
  {
    id: 'reminder-1',
  } as Reminder,
  {
    id: 'reminder-2',
  } as Reminder,
]

vi.mock('@hearye/db', async () => {
  const actual = await vi.importActual<typeof import('@hearye/db')>(
    '@hearye/db'
  )
  return {
    ...actual,
    findDueRemindersWithMessageAndUser: vi.fn().mockResolvedValue(reminders),
    scheduleRetryReminder: vi.fn(),
  }
})

vi.mock('@sentry/node', () => ({
  captureException: vi.fn(),
}))

vi.mock('./integrations/slack/remindUser', () => ({
  remindUser: vi.fn(),
}))

vi.mock('./sentry', () => ({
  traced: (_name: string, fn: unknown) => fn,
}))

const { findDueRemindersWithMessageAndUser, scheduleRetryReminder } = vi.mocked(
  await import('@hearye/db')
)
const { remindUser } = vi.mocked(
  await import('./integrations/slack/remindUser')
)

const { findAndProcessDueReminders } = await import(
  './findAndProcessDueReminders'
)

describe('findAndProcessDueReminders', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('processes each reminder sequentially', async () => {
    await findAndProcessDueReminders()
    expect(findDueRemindersWithMessageAndUser).toHaveBeenCalled()
    expect(remindUser).toHaveBeenCalledTimes(reminders.length)
  })

  it('reschedules reminders when remindUser throws', async () => {
    remindUser.mockRejectedValueOnce(new Error('slack down'))
    await findAndProcessDueReminders()
    expect(scheduleRetryReminder).toHaveBeenCalledTimes(1)
  })
})
