import { FastifyPluginCallback } from 'fastify'
import { App } from '@slack/bolt'
import { FileStateStore } from '@slack/oauth'
import { FastifyReceiver } from 'slack-bolt-fastify'

import { env } from '@hearye/env'
import { createLogger } from '@hearye/logger'

import { StringIndexed } from './events'
import { handleRequestAcknowledgementForMessage } from './event-handlers/handleRequestAcknowledgementForMessage'
import { handleRequireAcknowledgementForMessage } from './event-handlers/handleRequireAcknowledgementForMessage'
import { handleHomeOpened } from './event-handlers/handleHomeOpened'
import { handleReaction } from './event-handlers/handleReaction'
import { handleUserChange } from './event-handlers/handleUserChange'
import { installationStore } from './installationManagement'
import { handleAppMention } from './event-handlers/handleAppMention'



const logger = createLogger('hearye:api:bolt')

const {
  SLACK_CLIENT_ID,
  SLACK_CLIENT_SECRET,
  SLACK_SIGNING_SECRET,
  SLACK_STATE_SECRET,
  NODE_ENV,
} = env

/* c8 ignore start - environment variables would only be set up by the test */
if (
  !SLACK_CLIENT_ID ||
  !SLACK_CLIENT_SECRET ||
  !SLACK_SIGNING_SECRET ||
  !SLACK_STATE_SECRET
) {
  throw new Error('Slack creditials missing')
}
/* c8 ignore end */

export const registerSlack: FastifyPluginCallback = async (fastify) => {
  const receiver = new FastifyReceiver({
    signingSecret: SLACK_SIGNING_SECRET,
    clientId: SLACK_CLIENT_ID,
    clientSecret: SLACK_CLIENT_SECRET,
    logger: {
      ...logger,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      /* c8 ignore start - these are being noop'd for typescript */
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      getLevel: () => {
        // noop
      },
      setLevel: () => {
        // noop
      },
      setName: () => {
        // noop
      },
      /* c8 ignore start */

      info: logger.info.bind(logger),
      debug: logger.debug.bind(logger),
      warn: logger.warn.bind(logger),
      error: logger.error.bind(logger),
    },
    scopes: [
      'app_mentions:read',
      'chat:write',
      'channels:read',
      'groups:read',
      'reactions:read',
      'reactions:write',
      'users:read',
    ],
    stateSecret: SLACK_STATE_SECRET,
    installationStore,
    path: '/events',
    installerOptions: {
      clientOptions: {
        retryConfig: {
          retries: NODE_ENV === 'test' ? 0 : undefined,
        },
      },
      directInstall: true,
      stateStore: new FileStateStore({}),
      installPath: '/install',
      redirectUriPath: '/oauth_redirect',
    },
    fastify: fastify as never,
  })
  const app = new App<StringIndexed>({
    receiver,
  })
  
  const { withHandlerResolutionForTests } = NODE_ENV === 'test'
    ? await import('../../../tests/slack/helpers/postSlackEvent.ts')
    : { withHandlerResolutionForTests:(handler: unknown) => handler as (...args: unknown[]) => Promise<unknown> }

  app.event('app_home_opened', withHandlerResolutionForTests(handleHomeOpened))
  app.event('app_mention', withHandlerResolutionForTests(handleAppMention))
  app.event('reaction_added', withHandlerResolutionForTests(handleReaction))
  app.event('user_change', withHandlerResolutionForTests(handleUserChange))

  app.shortcut(
    'request_acknowledgement_for_message',
    handleRequestAcknowledgementForMessage as never // Slack types on shortcuts are incomplete
  )

  app.view(
    'require_acknowledgement_for_message',
    handleRequireAcknowledgementForMessage as never // Slack types on views are incomplete
  )
}
