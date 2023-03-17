import {
  findOrCreateAccount,
  updateAccountInstallation,
  findAccountInstallation,
  deleteAccountInstallation,
} from '@hearye/db'

import { Installation, InstallationQuery } from '@slack/bolt'

export async function storeInstallation(installation: Installation) {
  const externalId = installation.isEnterpriseInstall
    ? installation.enterprise?.id
    : installation.team?.id
  if (!externalId) throw new Error('Must have external ID')
  const account = await findOrCreateAccount({
    source: 'slack',
    externalId,
  })
  if (!account.id) throw new Error('Must find account')
  await updateAccountInstallation(account.id, installation)
}

export async function fetchInstallation(
  installQuery: InstallationQuery<boolean>
) {
  const externalId = installQuery.isEnterpriseInstall
    ? installQuery.enterpriseId
    : installQuery.teamId
  if (!externalId) throw new Error('Must have external ID')
  const result = await findAccountInstallation('slack', externalId)
  return result
}

export async function deleteInstallation(
  installQuery: InstallationQuery<boolean>
) {
  const externalId = installQuery.isEnterpriseInstall
    ? installQuery.enterpriseId
    : installQuery.teamId
  if (!externalId) throw new Error('Must have external ID')
  const account = await findOrCreateAccount({
    source: 'slack',
    externalId,
  })
  if (!account.id) throw new Error('Must find account')
  await deleteAccountInstallation(account.id)
}
