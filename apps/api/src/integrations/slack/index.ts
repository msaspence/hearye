import { FastifyPluginCallback } from 'fastify'
import { App, FileInstallationStore, LogLevel } from '@slack/bolt'
import { FileStateStore } from '@slack/oauth'
import { eventHandler } from './eventHandler'
import { homedir } from 'os'
import { FastifyReceiver } from 'slack-bolt-fastify'

import {
  SLACK_CLIENT_ID,
  SLACK_CLIENT_SECRET,
  SLACK_SIGNING_SECRET,
  SLACK_STATE_SECRET,
} from '@hearye/env'

export const registerSlack: FastifyPluginCallback = async (fastify) => {
  const receiver = new FastifyReceiver({
    signingSecret: SLACK_SIGNING_SECRET,
    clientId: SLACK_CLIENT_ID,
    clientSecret: SLACK_CLIENT_SECRET,
    scopes: ['commands', 'chat:write', 'app_mentions:read'],
    stateSecret: SLACK_STATE_SECRET,
    installationStore: new FileInstallationStore(),
    path: '/events',
    installerOptions: {
      directInstall: true,
      stateStore: new FileStateStore({}),
      installPath: '/install',
      redirectUriPath: '/oauth_redirect',
    },
    fastify,
  })

  const app = new App({
    logLevel: LogLevel.DEBUG,
    receiver,
  })
  app.event('app_mention', async (x) => {
    const { event, say } = x

    console.dir(await x.client.users.info({ user: event.user }), {
      depth: null,
    })
    await say({
      text: `<@${event.user}> Hi there :wave:`,
      blocks: [
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `<@${event.user}> Hi there :wave:`,
          },
        },
      ],
    })
  })
}
