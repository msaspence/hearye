import { OnboardingMessage } from '@hearye/db'
import { WebClient } from '@slack/web-api'
import { rest } from 'msw'

import { createMockServer } from '../../../../../tests/helpers/mock-server'
import { handleHomeOpened } from '../handleHomeOpened'

const channelId = 'C1234567890'
const teamId = 'T1234567890'
const userId = 'U1234567890'
const client = new WebClient('token', {
  retryConfig: { retries: 0 },
})

describe('handleHomeOpened', () => {
  describe('if sending the welcome message fails', () => {
    let postMessageCalls = 0
    const server = createMockServer(
      rest.post('https://slack.com/api/chat.postMessage', (req, res, ctx) => {
        if (postMessageCalls === 0) {
          postMessageCalls++
          return res.networkError('Arbitrary error')
        }
        return res(ctx.json({ ok: true }))
      })
    )

    it('will sent it again on the next app_home_opened event', async () => {
      await handleHomeOpened({
        client,
        payload: { type: 'app_home_opened', user: userId, channel: channelId },
        body: { team_id: teamId },
      })
      expect(await OnboardingMessage.query().resultSize()).toBe(0)
      const pendingRequest = server.waitForRequest(
        'POST',
        'https://slack.com/api/chat.postMessage'
      )
      await handleHomeOpened({
        client,
        payload: { type: 'app_home_opened', user: userId, channel: channelId },
        body: { team_id: teamId },
      })
      const request = await pendingRequest
      const params = new URLSearchParams(request.body as string)
      expect(params.get('channel')).toBe(channelId)
      expect(params.get('text')).toMatch(/^Welcome to Hear Ye!/)
      expect(await OnboardingMessage.query().resultSize()).toBe(1)
    })
  })
})
