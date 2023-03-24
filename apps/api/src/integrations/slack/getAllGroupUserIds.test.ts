import { WebClient } from '@slack/web-api'
import { getAllGroupUserIds } from './getAllGroupUserIds'
import { mock } from 'vitest-mock-extended'

const groupId = 'C1234567890'

const users = ['U1234567890', 'U2345678901']

describe('getAllGroupUserIds', () => {
  const users = mock<WebClient['users']>()
  const client = {
    usergroups: { users },
  } as unknown as WebClient

  it('calls and return users of the group', async () => {
    users.list.mockResolvedValueOnce({ ok: true, users })
    expect(await getAllGroupUserIds(client, groupId)).toBe(users)
  })

  it('limits results to 500', async () => {
    users.list.mockResolvedValueOnce({ ok: true, users })
    await getAllGroupUserIds(client, groupId)
    expect(users.list).toHaveBeenCalledWith({
      usergroup: groupId,
      limit: 500,
    })
  })

  describe("when the client doesn't have the correct scope", () => {
    it('returns true', async () => {
      users.list.mockRejectedValueOnce({
        code: 'slack_webapi_platform_error',
        data: { error: 'missing_scope' },
      })
      expect(await getAllGroupUserIds(client, groupId)).toStrictEqual([])
    })
  })

  describe('when there is a problem acknowledging the message', () => {
    it('throws an error', async () => {
      const error = new Error('Slack API Error')
      users.list.mockImplementationOnce(() => {
        throw error
      })
      await expect(getAllGroupUserIds(client, groupId)).rejects.toThrow(error)
    })
  })
})
