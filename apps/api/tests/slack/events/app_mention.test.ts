import { dayjs } from '@hearye/dayjs'
import { Account, User, Message, Reminder } from '@hearye/db'
import { postSlackEvent } from '../helpers/postSlackEvent'
import { createSlackAccount } from '../../fixtures/accounts/createSlackAccount'
import { getRemindAt } from '@hearye/db/access/reminders/getRemindAt'
import { WebClient } from '@slack/web-api'
import { rest } from 'msw'
import { createMockServer } from '../../helpers/mock-server'
import 'jest-extended'

const channelId = 'C03SD7H923F'
const messageTs = '1620920000'
const mentionedUserId = 'U03T5T28UU8'
const { waitForRequest } = createMockServer(
  rest.post('https://slack.com/api/reactions.add', (req, res, ctx) => {
    return res(ctx.status(200))
  })
)
let account: Account

describe('request to GET /slack/events', () => {
  beforeEach(async () => {
    account = await createSlackAccount()
  })

  describe('when it is an app_mention event', async () => {
    it('responds with 200', async () => {
      const response = await postAppMentionEvent(account)
      expect(response.statusCode).toBe(200)
    })

    it('creates a user for the mentioned user', async () => {
      await postAppMentionEvent(account)
      await expect(User.query().resultSize()).resolves.toBe(1)
      await expect(User.query().first()).resolves.toMatchObject({
        accountId: account.id,
        externalId: mentionedUserId,
        source: 'slack',
      })
    })

    it('creates a reminder for the mentioned user, and an associated message', async () => {
      await postAppMentionEvent(account)
      await expect(Reminder.query().resultSize()).resolves.toBe(1)
      const message = await Message.query().first()
      const user = await User.query().first()
      if (!message || !user) throw new Error('Message or User not found')
      const reminder = await Reminder.query().first()
      await expect(reminder).toMatchObject({
        acknowledgedAt: null,
        iteration: 1,
        messageId: message.id,
        accountId: account.id,
        retries: 0,
        userId: user.id,
      })
      if (!reminder) throw new Error('Reminder not found')
      const expectedRemindAt = dayjs()
        .tz('UTC')
        .businessDaysAdd(1)
        .minute(0)
        .second(0)
      expect(reminder.remindAt).toBeBetween(
        expectedRemindAt.hour(10).toDate(),
        expectedRemindAt.hour(11).toDate()
      )
    })

    it('acknowledges message receipt with a megaphone reaction emoji', async () => {
      const pendingRequest = waitForRequest(
        'POST',
        'https://slack.com/api/reactions.add'
      )
      await postAppMentionEvent(account)
      const request = await pendingRequest
      expect(request.body).toStrictEqual(
        new URLSearchParams({
          team_id: account.externalId || '',
          channel: channelId,
          name: 'mega',
          timestamp: messageTs,
        }).toString()
      )
    })

    it('is idempotent', async () => {
      await Promise.all([
        postAppMentionEvent(account),
        postAppMentionEvent(account),
        postAppMentionEvent(account),
        postAppMentionEvent(account),
        postAppMentionEvent(account),
        postAppMentionEvent(account),
      ])
      await expect(User.query().resultSize()).resolves.toBe(1)
      await expect(Reminder.query().resultSize()).resolves.toBe(1)
      await expect(Message.query().resultSize()).resolves.toBe(1)
    })

    describe('when the signature is incorrect', () => {
      it('responds with 401', async () => {
        const response = await postAppMentionEvent(account, {
          poisonSignature: true,
          awaitHandler: false,
        })
        expect(response.statusCode).toBe(401)
      })
    })
  })
})

async function postAppMentionEvent(
  account: Account,
  options: Partial<Parameters<typeof postSlackEvent>[1]> = {}
) {
  const installation = account.getInstallation()
  const response = await postSlackEvent(
    {
      client_msg_id: '1bd4f0f2-f57a-4408-aef1-9cd0d04ff95f',
      type: 'app_mention',
      text: `<@${installation.bot.userId}> <@${mentionedUserId}> hello`,
      user: installation.user.id,
      ts: '1620920000',
      blocks: [
        {
          type: 'rich_text',
          block_id: 'M5H',
          elements: [
            {
              type: 'rich_text_section',
              elements: [
                { type: 'user', user_id: installation.bot.userId },
                { type: 'text', text: ' ' },
                { type: 'user', user_id: 'U03T5T28UU8' },
                { type: 'text', text: ' hello' },
              ],
            },
          ],
        },
      ],
      team: account.externalId,
      channel: channelId,
      event_ts: new Date().getTime().toString(),
    },
    { account, ...options }
  )
  return response
}
