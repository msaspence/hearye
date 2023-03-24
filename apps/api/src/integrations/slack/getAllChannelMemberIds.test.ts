import { WebClient } from '@slack/web-api'
import { getAllChannelMemberIds } from './getAllChannelMemberIds'
import { mock } from 'vitest-mock-extended'

const channelId = 'C1234567890'
const members = ['U1234567890', 'U2345678901']

describe('getAllChannelMemberIds', () => {
  const conversations = mock<WebClient['conversations']>()
  const client = {
    conversations,
  } as unknown as WebClient

  it('calls and return members of the channel', async () => {
    conversations.members.mockResolvedValueOnce({ ok: true, members })
    expect(await getAllChannelMemberIds(client, channelId)).toBe(members)
  })

  it('limits results to 500', async () => {
    conversations.members.mockResolvedValueOnce({ ok: true, members })
    await getAllChannelMemberIds(client, channelId)
    expect(conversations.members).toHaveBeenCalledWith({
      channel: channelId,
      limit: 500,
    })
  })

  describe("when the client doesn't have the correct scope", () => {
    it('returns true', async () => {
      conversations.members.mockRejectedValueOnce({
        code: 'slack_webapi_platform_error',
        data: { error: 'missing_scope' },
      })
      expect(await getAllChannelMemberIds(client, channelId)).toStrictEqual([])
    })
  })

  describe('when there is a problem acknowledging the message', () => {
    it('throws an error', async () => {
      const error = new Error('Slack API Error')
      conversations.members.mockImplementationOnce(() => {
        throw error
      })
      await expect(getAllChannelMemberIds(client, channelId)).rejects.toThrow(
        error
      )
    })
  })
})
