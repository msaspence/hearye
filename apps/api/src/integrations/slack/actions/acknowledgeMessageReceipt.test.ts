import { WebClient } from '@slack/web-api'
import { acknowledgeMessageReceipt } from './acknowledgeMessageReceipt'
import { mock } from 'vitest-mock-extended'

const channelId = 'C1234567890'
const timestamp = '1234567890.123456'

describe('acknowledgeMessageReceipt', () => {
  const reactions = mock<WebClient['reactions']>()
  const client = {
    reactions,
  } as unknown as WebClient

  it('returns true', async () => {
    expect(
      await acknowledgeMessageReceipt(client, channelId, timestamp)
    ).toBeTrue()
  })

  it('reacts to the message with a mega emoji', async () => {
    await acknowledgeMessageReceipt(client, channelId, timestamp)
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
        await acknowledgeMessageReceipt(client, channelId, timestamp)
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
        acknowledgeMessageReceipt(client, channelId, timestamp)
      ).rejects.toThrow(error)
    })
  })
})
