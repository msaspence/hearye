import { FastifyPluginCallback } from 'fastify'

import { eventHandler } from './eventHandler'

export const registerSlack: FastifyPluginCallback = async (app) => {
  app.get('/events', eventHandler)
}
