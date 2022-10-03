import { Account } from '../../models/Account'
import { UniqueViolationError } from 'objection'

export async function findOrCreateAccount({
  source,
  externalId,
}: {
  source: string
  externalId: string
}): Promise<Account> {
  const existingAccount = await Account.query()
    .findOne({
      source,
      externalId,
    })
    .select('id')
  if (existingAccount) return existingAccount
  try {
    return await Account.query().insert({
      source,
      externalId,
    })
  } catch (error) {
    if (error instanceof UniqueViolationError) {
      return findOrCreateAccount({ source, externalId })
    }
    throw error
  }
}
