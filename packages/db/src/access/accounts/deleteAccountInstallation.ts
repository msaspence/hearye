import { Account } from '../../models/Account'

export async function deleteAccountInstallation(id: string) {
  return Account.query().findById(id).patch({ installation: null })
}
