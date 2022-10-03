import { Account } from '../../models/Account'
export function upsertAccount({
  source,
  externalId,
}: {
  source: string
  externalId: string
}) {
  return Account.query()
    .insert({
      source,
      externalId,
    })
    .onConflict(['source', 'externalId'])
    .merge()
}
