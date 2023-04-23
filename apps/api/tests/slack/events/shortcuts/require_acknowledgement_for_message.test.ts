import { rest } from 'msw'
import { Account, User, Message, Reminder } from '@hearye/db'
import { dayjs } from '@hearye/dayjs'

import { createSlackAccount } from '../../../fixtures/accounts/createSlackAccount'
import { postSlackEvent } from '../../helpers/postSlackEvent'
import { postSlackRequest } from '../../helpers/postSlackRequest'
import { createMockServer } from '../../../helpers/mock-server'

let account: Account
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let installation: Record<string, any>
let noChannelOrGroupScope: boolean
const channelId = 'C03SD7H923F'
const messageTs = '1620920000'
const mentionedUserId = 'U03T5T28UU9'
const authorUserId = 'U03T5T28UU8'
const selectedUserId = 'U03T5T28UU6'
const channelMemberId = 'U03T5T28UU7'
const groupMemberId = 'U03T5T28UU6'

describe('request to GET /slack/events', () => {
  beforeEach(async () => {
    account = await createSlackAccount()
    installation = account.getInstallation()
    noChannelOrGroupScope = false
  })

  describe('when it is an require_acknowledgement_for_message shortcut', async () => {
    const server = createMockServer(
      rest.post('https://slack.com/api/reactions.add', (req, res, ctx) => {
        return res(ctx.json({ ok: true }))
      }),
      rest.post(
        'https://slack.com/api/conversations.history',
        (req, res, ctx) => {
          return res(
            ctx.json({
              ok: true,
              messages: [
                {
                  team: account.externalId,
                  channel: channelId,
                  ts: messageTs,
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
                            { type: 'user', user_id: mentionedUserId },
                            { type: 'text', text: ' hello' },
                          ],
                        },
                      ],
                    },
                  ],
                  user: authorUserId,
                  client_msg_id: '1bd4f0f2-f57a-4408-aef1-9cd0d04ff95f',
                },
              ],
            })
          )
        }
      ),
      rest.post(
        'https://slack.com/api/conversations.members',
        (req, res, ctx) => {
          if (noChannelOrGroupScope) {
            return res(ctx.json({ ok: false, error: 'missing_scope' }))
          }
          return res(
            ctx.json({ ok: true, members: [channelMemberId, authorUserId] })
          )
        }
      ),
      rest.post(
        'https://slack.com/api/usergroups.users.list',
        (req, res, ctx) => {
          if (noChannelOrGroupScope) {
            return res(ctx.json({ ok: false, error: 'missing_scope' }))
          }
          return res(
            ctx.json({ ok: true, users: [groupMemberId, authorUserId] })
          )
        }
      )
    )
    it('responds with 200', async () => {
      const response = await postRequestAcknowledgementForMessage(account)
      expect(response.statusCode).toBe(200)
    })

    it('acknowledges message receipt with a megaphone reaction emoji', async () => {
      const pendingRequest = server.waitForRequest(
        'POST',
        'https://slack.com/api/reactions.add'
      )
      await postRequestAcknowledgementForMessage(account)
      const request = await pendingRequest
      expect(request.body).toBe(
        new URLSearchParams({
          team_id: account.externalId || '',
          channel: channelId,
          name: 'mega',
          timestamp: messageTs,
        }).toString()
      )
    })

    it('is idempotent', async () => {
      await postRequestAcknowledgementForMessage(account)
      await postRequestAcknowledgementForMessage(account)
      await expect(User.query().resultSize()).resolves.toBe(1)
      await expect(Reminder.query().resultSize()).resolves.toBe(1)
      await expect(Message.query().resultSize()).resolves.toBe(1)
    })

    describe('when mentioned users and groups is selected', () => {
      it('creates a user for the mentioned user', async () => {
        await postRequestAcknowledgementForMessage(account)
        await expect(Account.query().resultSize()).resolves.toBe(1)
        await expect(User.query().resultSize()).resolves.toBe(1)
        await expect(User.query().first()).resolves.toMatchObject({
          accountId: account.id,
          externalId: mentionedUserId,
          source: 'slack',
        })
      })

      it('creates a reminder for the mentioned user, and an associated message', async () => {
        await postRequestAcknowledgementForMessage(account)
        await expect(Reminder.query().resultSize()).resolves.toBe(1)
        const message = await Message.query().first()
        const user = await User.query().first()
        const reminder = await Reminder.query().first()
        await expect(reminder).toMatchObject({
          acknowledgedAt: null,
          iteration: 1,
          messageId: message?.id,
          accountId: account?.id,
          retries: 0,
          userId: user?.id,
        })
        if (!reminder) throw new Error('Reminder not found')
        const expectedRemindAt = dayjs()
          .tz('UTC')
          .businessDaysAdd(1)
          .minute(0)
          .second(0)
          .millisecond(0)
        expect(reminder.remindAt).toBeBetween(
          expectedRemindAt.hour(10).toDate(),
          expectedRemindAt.hour(11).toDate()
        )
      })
    })

    describe('when other users are provided', () => {
      it('creates a reminder for the provided users, and an associated message', async () => {
        await postRequestAcknowledgementForMessage(account, {
          selectedUsers: [selectedUserId],
          includeAlreadyMentionedUsers: false,
        })
        await expect(User.query().resultSize()).resolves.toBe(1)
        await expect(Reminder.query().resultSize()).resolves.toBe(1)
        const message = await Message.query().first()
        const selectedUser = await User.query().first()
        const selectedUserReminder = await Reminder.query().first()
        await expect(selectedUserReminder).toMatchObject({
          acknowledgedAt: null,
          iteration: 1,
          messageId: message?.id,
          accountId: account?.id,
          retries: 0,
          userId: selectedUser?.id,
        })
        if (!selectedUserReminder) throw new Error('Reminder not found')
        expect(selectedUser).toMatchObject({
          accountId: account.id,
          externalId: selectedUserId,
          source: 'slack',
        })
        const expectedRemindAt = dayjs()
          .tz('UTC')
          .businessDaysAdd(1)
          .minute(0)
          .second(0)
          .millisecond(0)
        expect(selectedUserReminder.remindAt).toBeBetween(
          expectedRemindAt.hour(10).toDate(),
          expectedRemindAt.hour(11).toDate()
        )
      })
    })

    describe('when no additions users are selected and mentioned users and groups is not selected', () => {
      it('does nothing', async () => {
        await postRequestAcknowledgementForMessage(account, {
          includeAlreadyMentionedUsers: false,
        })
        await expect(Reminder.query().resultSize()).resolves.toBe(0)
        await expect(User.query().resultSize()).resolves.toBe(0)
      })
    })
  })
})

async function postRequestAcknowledgementForMessage(
  account: Account,
  options: Partial<Parameters<typeof postSlackEvent>[1]> & {
    selectedUsers?: string[]
    includeAlreadyMentionedUsers?: false
  } = {}
) {
  const response = await postSlackRequest(
    {
      type: 'view_submission',
      user: {
        team_id: account.externalId,
      },
      view: {
        team_id: account.externalId,
        callback_id: 'require_acknowledgement_for_message',
        state: {
          values: {
            'D=aLu': {
              options: {
                type: 'checkboxes',
                selected_options:
                  options.includeAlreadyMentionedUsers !== false
                    ? [
                        {
                          text: {
                            type: 'plain_text',
                            text: 'Require acknowledgement from users and groups already mentioned in the message',
                            emoji: true,
                          },
                          value: 'include-mentioned',
                        },
                      ]
                    : [],
              },
            },
            UQl: {
              'other-users': {
                type: 'multi_users_select',
                selected_users: options.selectedUsers,
              },
            },
          },
        },
        private_metadata: JSON.stringify({
          message: {
            channel: channelId,
            ts: messageTs,
          },
        }),
      },
    },
    { account, ...options }
  )
  return response
}
