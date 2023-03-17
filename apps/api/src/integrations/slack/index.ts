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
import * as installationManagement from './installationManagement'
import { handleAppMention } from './event-handlers/handleAppMention'
import { withHandlerResolutionForTests } from '../../../tests/slack/helpers/postSlackEvent'

const logger = createLogger('hearye:api:bolt')

const {
  SLACK_CLIENT_ID,
  SLACK_CLIENT_SECRET,
  SLACK_SIGNING_SECRET,
  SLACK_STATE_SECRET,
} = env

if (
  !SLACK_CLIENT_ID ||
  !SLACK_CLIENT_SECRET ||
  !SLACK_SIGNING_SECRET ||
  !SLACK_STATE_SECRET
) {
  throw new Error('Slack creditials missing')
}

export const registerSlack: FastifyPluginCallback = async (fastify) => {
  const receiver = new FastifyReceiver({
    signingSecret: SLACK_SIGNING_SECRET,
    clientId: SLACK_CLIENT_ID,
    clientSecret: SLACK_CLIENT_SECRET,
    logger: {
      ...logger,
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
      info: logger.info.bind(logger),
      debug: logger.debug.bind(logger),
      warn: logger.warn.bind(logger),
      error: logger.error.bind(logger),
    },
    scopes: [
      'app_mentions:read',
      'chat:write',
      'reactions:read',
      'reactions:write',
      'users:read',
    ],
    stateSecret: SLACK_STATE_SECRET,
    installationStore: installationManagement,
    path: '/events',
    installerOptions: {
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
