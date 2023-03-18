import { Account, User, Message, Reminder } from '@hearye/db'
import { postSlackEvent } from '../helpers/postSlackEvent'
import { createSlackAccount } from '../../fixtures/accounts/createSlackAccount'

const channelId = 'C03SD7H923F'
const messageTs = '1620920000'
const userId = 'U03T5T28UU8'
const aDifferentUserId = 'U03T5T28UU7'
const messageId = 'G03SD7H923F.1620920000'

let account: Account

describe('request to GET /slack/events', () => {
  describe('when it is an reaction_added event', async () => {
    beforeEach(async () => {
      account = await createSlackAccount()
    })

    describe('when the reaction is a 👍', () => {
      it('responds with 200', async () => {
        const response = await postReactionAddedEvent(account, {
          reaction: '+1',
          userId,
          messageTs,
        })
        expect(response.statusCode).toBe(200)
      })

      it('acknowledges the reminder', async () => {
        const testStartedAt = new Date()

        const reminder = await createReminderToAcknowledge()
        await postReactionAddedEvent(account, {
          reaction: '+1',
          userId,
          messageTs,
        })
        const updatedReminder = await Reminder.query().findById(reminder.id)
        expect(updatedReminder?.acknowledgedAt).toBeAfter(testStartedAt)
      })
    })
    describe('when the reaction is a 📣', () => {
      it('acknowledges the reminder', async () => {
        const testStartedAt = new Date()

        const reminder = await createReminderToAcknowledge()
        await postReactionAddedEvent(account, {
          reaction: 'mega',
          userId,
          messageTs,
        })
        const updatedReminder = await Reminder.query().findById(reminder.id)
        expect(updatedReminder?.acknowledgedAt).toBeAfter(testStartedAt)
      })
    })

    describe('when the reaction is another emoji', () => {
      it('does nothing', async () => {
        const reminder = await createReminderToAcknowledge()
        await postReactionAddedEvent(account, {
          reaction: 'phone',
          userId,
          messageTs,
        })
        const updatedReminder = await Reminder.query().findById(reminder.id)
        expect(updatedReminder?.acknowledgedAt).toBeNull()
      })
    })

    describe("when the user isn't in Hear Ye", () => {
      it('does nothing', async () => {
        const reminder = await createReminderToAcknowledge()
        await postReactionAddedEvent(account, {
          reaction: 'phone',
          userId: aDifferentUserId,
          messageTs,
        })
        const updatedReminder = await Reminder.query().findById(reminder.id)
        expect(updatedReminder?.acknowledgedAt).toBeNull()
      })
    })
  })
})

async function postReactionAddedEvent(
  account: Account,
  options: Partial<Parameters<typeof postSlackEvent>[1]> & {
    reaction: string
    userId: string
    messageTs: string
  }
) {
  const response = await postSlackEvent(
    {
      type: 'reaction_added',
      user: options.userId,
      reaction: options.reaction || '+1',
      item: {
        type: 'message',
        channel: channelId,
        ts: messageTs,
      },
      item_user: userId,
      event_ts: '1679123999.000400',
    },
    { account, ...options }
  )
  return response
}

async function createReminderToAcknowledge() {
  const user = await User.query().insert({
    externalId: userId,
    source: 'slack',
    accountId: account.id,
  })
  const message = await Message.query().insert({
    channelExternalId: channelId,
    timestamp: messageTs,
    accountId: account.id,
    externalId: messageId,
    source: 'slack',
  })
  return await Reminder.query().insert({
    accountId: account.id,
    iteration: 1,
    messageId: message.id,
    userId: user.id,
    retries: 0,
    remindAt: new Date(),
  })
}
