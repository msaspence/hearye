import { Account } from '../../models/Account'
import { UniqueViolationError } from 'objection'

export async function findOrCreateAccount({
  source,
  externalId,
  installation,
}: {
  source: string
  externalId: string
  installation: any
}): Promise<Account> {
  const existingAccount = await Account.query()
    .findOne({
      source,
      externalId,
    })
    .select('*')
  if (existingAccount) {
    return existingAccount
  }
  try {
    const created = await Account.query()
      .insert({
        source,
        externalId,
        installation,
      })
      .returning('*')

    return created
  } catch (error) {
    if (error instanceof UniqueViolationError) {
      const refound = await findOrCreateAccount({
        source,
        externalId,
        installation,
      })
      return refound
    }
    throw error
  }
}
