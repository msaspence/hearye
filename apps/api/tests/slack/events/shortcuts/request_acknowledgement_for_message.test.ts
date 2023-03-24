import { rest } from 'msw'

import { Account } from '@hearye/db'

import { createSlackAccount } from '../../../fixtures/accounts/createSlackAccount'
import { postSlackRequest } from '../../helpers/postSlackRequest'
import { createMockServer } from '../../../helpers/mock-server'

let account: Account
const triggerId = '944799105734.773906753841.38b5894552bdd4a780554ee59d1f3638'
const userId = 'U03T5T28UU8'
const channelId = 'C03SD7H923F'
const messageTs = '1620920000'

describe('request to GET /slack/events', () => {
  beforeEach(async () => {
    account = await createSlackAccount()
  })

  describe('when it is an request_acknowledgement_for_message shortcut', async () => {
    const server = createMockServer(
      rest.post('https://slack.com/api/views.open', (req, res, ctx) => {
        return res(ctx.json({ ok: true }))
      })
    )
    it('responds with 200', async () => {
      const response = await postRequestAcknowledgementForMessage(account)
      expect(response.statusCode).toBe(200)
    })

    it('opens a modal to require acknowledgement for message', async () => {
      const pendingRequest = server.waitForRequest(
        'POST',
        'https://slack.com/api/views.open'
      )
      await postRequestAcknowledgementForMessage(account)
      const request = await pendingRequest
      const params = new URLSearchParams(request.body as string)
      expect(params.get('team_id')).toBe(account.externalId)
      expect(params.get('trigger_id')).toBe(triggerId)
      const view = JSON.parse(params.get('view') as string)
      expect(view.type).toBe('modal')
      expect(view.callback_id).toBe('require_acknowledgement_for_message')
      const private_metadata = JSON.parse(view.private_metadata)
      expect(private_metadata).toEqual({
        message: { channel: channelId, ts: messageTs },
      })
    })
  })
})

function postRequestAcknowledgementForMessage(
  account: Account,
  options: Partial<Parameters<typeof postSlackRequest>[1]> = {}
) {
  return postSlackRequest(
    {
      type: 'shortcut',
      callback_id: 'request_acknowledgement_for_message',
      trigger_id: triggerId,
      user: {
        id: userId,
        team_id: account.externalId,
      },
      channel: {
        id: channelId,
      },
      message: {
        ts: messageTs,
      },
    },
    { account, ...options }
  )
}
