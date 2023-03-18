import { Account, User, OnboardingMessage } from '@hearye/db'
import { postSlackEvent } from '../helpers/postSlackEvent'
import { createSlackAccount } from '../../fixtures/accounts/createSlackAccount'
import { rest } from 'msw'
import { createMockServer } from '../../helpers/mock-server'
import 'jest-extended'

const channelId = 'C03SD7H923F'
const authorUserId = 'U03T5T28UU8'

let account: Account
let installation: Record<string, any>

describe('request to GET /slack/events', () => {
  describe('when it is an app_home_opened event', async () => {
    beforeEach(async () => {
      account = await createSlackAccount()
      installation = account.getInstallation()
    })
    describe('when the welcome message post is successful', () => {
      const server = createMockServer(
        rest.post('https://slack.com/api/chat.postMessage', (req, res, ctx) => {
          return res(ctx.status(200))
        })
      )

      it('responds with 200', async () => {
        const response = await postAppHomeEvent(account)
        expect(response.statusCode).toBe(200)
      })

      it('sends a welcome message to the user', async () => {
        const pendingRequest = server.waitForRequest(
          'POST',
          'https://slack.com/api/chat.postMessage'
        )
        await postAppHomeEvent(account)
        const request = await pendingRequest
        const params = new URLSearchParams(request.body as string) as any
        expect(params.get('team_id')).toBe(installation.team.id)
        expect(params.get('channel')).toBe(channelId)
        expect(params.get('text')).toMatch(/^Welcome to Hear Ye!/)
      })
    })

    describe('when the user has already been sent the welcome message', () => {
      const server = createMockServer()
      it('does not send the welcome message', async () => {
        const user = await User.query().insert({
          accountId: account.id,
          externalId: authorUserId,
          source: 'slack',
        })
        await OnboardingMessage.query().insert({
          accountId: account.id,
          userId: user.id,
          messageKey: 'welcome',
        })
        await postAppHomeEvent(account)
        expect(server.requests.length).toBe(0)
      })
    })
  })
})

const BROADCAST_MENTIONS = ['here', 'channel', 'everyone']
async function postAppHomeEvent(
  account: Account,
  options: Partial<Parameters<typeof postSlackEvent>[1]> = {}
) {
  const response = await postSlackEvent(
    {
      type: 'app_home_opened',
      user: authorUserId,
      channel: channelId,
      tab: 'home',
      event_ts: '1679067795.117588',
    },
    { account, ...options }
  )
  return response
}
