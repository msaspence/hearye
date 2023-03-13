import { FastifyPluginCallback } from 'fastify'
import { App, LogLevel } from '@slack/bolt'
import { FileStateStore } from '@slack/oauth'

import { StringIndexed } from './events'
import { handleMessage } from './handleMessage'
import { handleHomeOpened } from './handleHomeOpened'
import { handleReaction } from './handleReaction'
import { handleUserChange } from './handleUserChange'
import { FastifyReceiver } from 'slack-bolt-fastify'
import * as installationManagement from './installationManagement'
import { env } from '@hearye/env'

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
    fastify,
  })
  const app = new App<StringIndexed>({
    logLevel: LogLevel.DEBUG,
    receiver,
  })

  app.event('app_home_opened', handleHomeOpened)
  app.event('app_mention', handleMessage)
  app.event('reaction_added', handleReaction)
  app.event('user_change', handleUserChange)
}
