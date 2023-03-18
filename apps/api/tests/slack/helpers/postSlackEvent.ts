import { createApp } from '../../../src/createApp'
import { Account, findAccountInstallation } from '@hearye/db'
import { env } from '@hearye/env'
import { createHmac } from 'crypto'

import { postSlackRequest } from './postSlackRequest'

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
  event: object,
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

  const result = await postSlackRequest(
    {
      event,
      type: 'event_callback',
      event_id: 'Ev1',
      event_time: new Date().getTime(),
      event_context:
        '4-eyJldCI6InJlYWN0aW9uX2FkZGVkIiwidGlkIjoiVDAzUzlISzBYQlEiLCJhaWQiOiJBMDNUNVRQRFhBNCIsImNpZCI6IkMwM1NEN0g5MjNGIn0',
    },
    { account, awaitHandler, poisonSignature }
  )
  if (awaitHandler) await promise

  return result
}
