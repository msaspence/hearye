import { Account, User, Message, Reminder } from '@hearye/db'
import { postSlackEvent } from '../helpers/postSlackEvent'
import { createSlackAccount } from '../../fixtures/accounts/createSlackAccount'
import { dayjs } from 'packages/dayjs/src'

let account: Account
const userId = 'U03T5T28UU8'
const aDifferentUserId = 'U03T5T28UU7'
const remindAt = new Date('2023-05-18T04:00:00.000Z')

describe('request to GET /slack/events', () => {
  describe('when it is an user_change event', async () => {
    beforeEach(async () => {
      account = await createSlackAccount()
    })

    describe('when the user exists', () => {
      it('responds with 200', async () => {
        const response = await postUserChangedEvent(account, { userId })
        expect(response.statusCode).toBe(200)
      })

      it('updates the user timezone', async () => {
        const user = await createUser({ timezone: 'Europe/London' })
        await postUserChangedEvent(account, { userId })
        const updatedUser = await User.query().findById(user.id)
        expect(updatedUser?.timezone).toBe('Europe/Athens')
      })

      it("updates the user's pending reminders's reminded at", async () => {
        const reminder = await createReminder({
          remindedAt: null,
          acknowledgedAt: null,
        })
        await postUserChangedEvent(account, { userId })
        const updatedReminder = await Reminder.query().findById(reminder.id)
        expect(updatedReminder?.remindAt).toStrictEqual(
          dayjs(remindAt).hour(2).toDate()
        )
      })

      it("doesn't update the user's reminded reminders", async () => {
        const reminder = await createReminder({
          remindedAt: new Date(),
          acknowledgedAt: null,
        })
        await postUserChangedEvent(account, { userId })
        const updatedReminder = await Reminder.query().findById(reminder.id)
        expect(updatedReminder?.remindAt).toStrictEqual(remindAt)
      })

      it("doesn't update the user's acknowledged reminders ", async () => {
        const reminder = await createReminder({
          acknowledgedAt: new Date(),
          remindedAt: null,
        })
        await postUserChangedEvent(account, { userId })
        const updatedReminder = await Reminder.query().findById(reminder.id)
        expect(updatedReminder?.remindAt).toStrictEqual(remindAt)
      })
    })

    describe("when the user doesn't exist", () => {
      it('does nothing', async () => {
        const user = await createUser()
        await postUserChangedEvent(account, { userId: aDifferentUserId })
        const updatedUser = await User.query().findById(user.id)
        expect(updatedUser?.timezone).toBe('Europe/London')
      })
    })
  })
})

async function postUserChangedEvent(
  account: Account,
  options: Partial<Parameters<typeof postSlackEvent>[1]> & { userId: string }
) {
  const response = await postSlackEvent(
    {
      type: 'user_change',
      user: {
        id: options.userId,
        tz: 'Europe/Athens',
      },
    },
    { account, ...options }
  )
  return response
}

async function createUser(options: Partial<User> = {}) {
  const user = await User.query().insert({
    accountId: account.id,
    source: 'slack',
    externalId: userId,
    timezone: 'Europe/London',
    ...options,
  })
  return user
}

async function createReminder(options: Partial<Reminder> = {}) {
  const user = await createUser()
  const message = await Message.query().insert({
    channelExternalId: 'C03SD7H923F',
    timestamp: '1620920000',
    accountId: account.id,
    externalId: 'G03SD7H923F.1620920000',
    source: 'slack',
  })
  return await Reminder.query().insert({
    accountId: account.id,
    iteration: 1,
    messageId: message.id,
    userId: user.id,
    retries: 0,
    remindAt,
    ...options,
  })
}
