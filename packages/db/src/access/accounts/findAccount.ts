import { Account } from '../../models/Account'

export function findAccount({
  externalId,
  source,
}: {
  externalId: string
  source: string
}) {
  return Account.query().findOne({
    externalId,
    source,
  })
}
