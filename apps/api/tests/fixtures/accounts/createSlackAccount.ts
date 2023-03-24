import { findOrCreateAccount } from '@hearye/db'

export async function createSlackAccount() {
  return await findOrCreateAccount({
    externalId: 'T03S9HK0XBQ',
    source: 'slack',
    installation: JSON.stringify({
      team: { id: 'T03S9HK0XBQ', name: 'Test' },
      user: { id: 'U04HEDT15KM' },
      tokenType: 'bot',
      isEnterpriseInstall: false,
      appId: 'A03T5TPDXA4',
      authVersion: 'v2',
      bot: {
        scopes: [
          'commands',
          'chat:write',
          'app_mentions:read',
          'channels:history',
          'groups:history',
          'im:history',
          'reactions:read',
          'reactions:write',
          'users:read',
        ],
        token: 'xoxb-3893597031398-3912944693217-RrUIL0NSeueAygvlUMduUmZT',
        userId: 'U03SUTSLD6D',
        id: 'B03T60K9K7S',
      },
    }),
  })
}
