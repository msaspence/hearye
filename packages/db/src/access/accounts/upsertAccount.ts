import { Account } from '../../models/Account'
export function upsertAccount({
  source,
  externalId,
}: {
  source: string
  externalId: string
}) {
  console.log(
    source,
    externalId,
    Account.query()
      .insert({
        source,
        externalId,
      })
      .onConflict(['source', 'externalId'])
      .merge()
      .toKnexQuery()
      .toSQL()
  )
  return Account.query()
    .insert({
      source,
      externalId,
    })
    .onConflict(['source', 'externalId'])
    .merge()
}
