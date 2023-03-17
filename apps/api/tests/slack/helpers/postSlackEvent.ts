import { createApp } from '../../../src/createApp'
import { Account, findAccountInstallation } from '@hearye/db'
import { env } from '@hearye/env'
import { createHmac } from 'crypto'

type PostSlackEventOptions = {
  account: Account
  awaitHandler?: boolean
  poisonSignature?: boolean
}

let eventHandlerResolver: (value: unknown) => void

export function withHandlerResolutionForTests(handler: unknown) {
  return async (...args: unknown[]) => {
    try {
      // @ts-ignore
      const result = await handler(...args)
      return result
    } catch (error) {
    } finally {
      if (eventHandlerResolver) eventHandlerResolver(null)
    }
  }
}

export async function postSlackEvent(
  event: any,
  {
    account,
    awaitHandler = true,
    poisonSignature = false,
  }: PostSlackEventOptions
) {
  if (!account.externalId) throw new Error('Must have external ID')
  const installation = account.getInstallation()
  const promise = new Promise((resolve) => {
    eventHandlerResolver = resolve
  })
  const payload = {
    token: 'xeghsQqBaEOuqMVYIONG82tX',
    team_id: installation.team.id,
    context_team_id: installation.team.id,
    context_enterprise_id: null,
    api_app_id: installation.appId,
    event,
    type: 'event_callback',
    event_id: 'Ev1',
    event_time: new Date().getTime(),
    authorizations: [
      {
        enterprise_id: null,
        team_id: installation.team.id,
        user_id: installation.bot.userId,
        is_bot: true,
        is_enterprise_install: installation.isEnterpriseInstall,
      },
    ],
    is_ext_shared_channel: false,
    event_context:
      '4-eyJldCI6InJlYWN0aW9uX2FkZGVkIiwidGlkIjoiVDAzUzlISzBYQlEiLCJhaWQiOiJBMDNUNVRQRFhBNCIsImNpZCI6IkMwM1NEN0g5MjNGIn0',
  }

  const hmac = createHmac('sha256', env.SLACK_SIGNING_SECRET)
  const body = JSON.stringify(payload)
  const version = 'v0'
  const ts = new Date().getTime()
  hmac.update(`${version}:${ts}:${body}`)
  const signature = `${version}=${hmac.digest('hex')}${
    poisonSignature ? 'poison' : ''
  }`

  const app = createApp()
  const response = await app.inject({
    method: 'POST',
    url: '/slack/events',
    headers: {
      'x-slack-request-timestamp': ts,
      'x-slack-signature': signature,
    },
    payload,
  })
  if (awaitHandler) await promise
  await app.close()
  return response
}
