import { Message } from '../../models/Message'
import { UniqueViolationError } from 'objection'

export async function findOrCreateMessage(params: {
  accountId: string
  source: string
  externalId: string
  channelExternalId: string
  timestamp: string
}): Promise<Message> {
  const { accountId, source, externalId } = params

  const existingMessage = await Message.query()
    .findOne({
      accountId,
      source,
      externalId,
    })
    .select('id')

  if (existingMessage) return existingMessage
  try {
    return await Message.query().insert(params)
  } catch (error) {
    if (error instanceof UniqueViolationError) {
      return findOrCreateMessage(params)
    }
    throw error
  }
}
