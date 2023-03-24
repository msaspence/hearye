import { WebClient } from '@slack/web-api'
import { acknowledgeMessageReciept } from './acknowledgeMessageReciept'
import { mock } from 'vitest-mock-extended'

const channelId = 'C1234567890'
const timestamp = '1234567890.123456'

describe('acknowledgeMessageReciept', () => {
  const reactions = mock<WebClient['reactions']>()
  const client = {
    reactions,
  } as unknown as WebClient

  it('returns true', async () => {
    expect(
      await acknowledgeMessageReciept(client, channelId, timestamp)
    ).toBeTrue()
  })

  it('reacts to the message with a mega emoji', async () => {
    await acknowledgeMessageReciept(client, channelId, timestamp)
    expect(client.reactions.add).toHaveBeenCalledWith({
      channel: channelId,
      name: 'mega',
      timestamp,
    })
  })

  describe('when the message has already been acknowledged', () => {
    it('returns true', async () => {
      reactions.add.mockRejectedValueOnce({
        code: 'slack_webapi_platform_error',
        data: { error: 'already_reacted' },
      })
      expect(
        await acknowledgeMessageReciept(client, channelId, timestamp)
      ).toBeTrue()
    })
  })

  describe('when there is a problem acknowledging the message', () => {
    it('throws an error', async () => {
      const error = new Error('Slack API Error')
      reactions.add.mockImplementationOnce(() => {
        throw error
      })
      await expect(
        acknowledgeMessageReciept(client, channelId, timestamp)
      ).rejects.toThrow(error)
    })
  })
})
