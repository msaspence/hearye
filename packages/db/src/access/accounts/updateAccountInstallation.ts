import { Account } from '../../models/Account'

export async function updateAccountInstallation(
  id: string,
  installation: unknown
) {
  return Account.query()
    .findById(id)
    .patch({ installation: JSON.stringify(installation) })
}
