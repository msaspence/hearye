import { Account } from '@hearye/db'

import {
  storeInstallation,
  deleteInstallation,
  fetchInstallation,
} from './installationManagement'
import { createSlackAccount } from '../../../tests/fixtures/accounts/createSlackAccount'

describe('storeInstallation', () => {
  describe('when the account already exists', () => {
    it('updates the installation', async () => {
      const account = await createSlackAccount()
      if (!account.externalId || !account.id) {
        throw new Error('Must have account id')
      }
      const installation = {
        isEnterpriseInstall: false,
        team: { id: account.externalId },
        enterprise: undefined,
        user: { token: 'token', id: 'user-id', scopes: [] },
      }
      await storeInstallation(installation)
      const updatedAccount = await Account.query().findById(account.id)
      expect(updatedAccount?.installation).toEqual(JSON.stringify(installation))
    })
  })

  describe("when the account doesn't already exist", () => {
    it('creates the account', async () => {
      const externalId = 'external-id'
      const installation = {
        isEnterpriseInstall: false,
        team: { id: externalId },
        enterprise: undefined,
        user: { token: 'token', id: 'user-id', scopes: [] },
      }
      await storeInstallation(installation)
      expect(await Account.query().resultSize()).toBe(1)
      const createdAccount = await Account.query().first()
      expect(createdAccount).toMatchObject({
        source: 'slack',
        externalId,
        installation: JSON.stringify(installation),
      })
    })
  })

  describe('when the account is enterprise', () => {
    it('uses the enterprise id', async () => {
      const account = await createSlackAccount()
      if (!account.externalId || !account.id) {
        throw new Error('Must have account id')
      }
      const installation = {
        isEnterpriseInstall: true,
        enterprise: { id: account.externalId },
        team: undefined,
        user: { token: 'token', id: 'user-id', scopes: [] },
      }
      await storeInstallation(installation)
      const updatedAccount = await Account.query().findById(account.id)
      expect(updatedAccount?.installation).toEqual(JSON.stringify(installation))
    })
  })

  describe('when externalId is missing', () => {
    it('throws an error', async () => {
      const installation = {
        isEnterpriseInstall: false,
        team: undefined,
        enterprise: undefined,
        user: { token: 'token', id: 'user-id', scopes: [] },
      }
      await expect(storeInstallation(installation)).rejects.toThrow(
        'Must have external ID'
      )
    })
  })
})

describe('fetchInstallation', () => {
  describe('when the account exists', () => {
    it('returns the installation', async () => {
      const account = await createSlackAccount()
      const installation = {
        isEnterpriseInstall: false,
        teamId: account.externalId,
        enterpriseId: undefined,
        user: { token: 'token', id: 'user-id', scopes: [] },
      }
      expect(await fetchInstallation(installation)).toMatchObject(
        JSON.parse(account?.installation || '')
      )
    })
  })

  describe("when the account doesn't exist", () => {
    it('returns undefined', async () => {
      const installation = {
        isEnterpriseInstall: false,
        teamId: 'no-team',
        enterpriseId: undefined,
        user: { token: 'token', id: 'user-id', scopes: [] },
      }
      expect(await fetchInstallation(installation)).toBeNull()
    })
  })

  describe('when the account is enterprise', () => {
    it('uses the enterprise id', async () => {
      const account = await createSlackAccount()
      const installation = {
        isEnterpriseInstall: true,
        enterpriseId: account.externalId,
        teamId: undefined,
        user: { token: 'token', id: 'user-id', scopes: [] },
      }
      expect(await fetchInstallation(installation)).toMatchObject(
        JSON.parse(account?.installation || '')
      )
    })
  })

  describe('when externalId is missing', () => {
    it('throws an error', async () => {
      const installation = {
        isEnterpriseInstall: false,
        teamId: undefined,
        enterpriseId: undefined,
        user: { token: 'token', id: 'user-id', scopes: [] },
      }
      await expect(fetchInstallation(installation)).rejects.toThrow(
        'Must have external ID'
      )
    })
  })
})

describe('deleteInstallation', () => {
  describe('when the account already exists', () => {
    it('deletes the installation, but not the account', async () => {
      const account = await createSlackAccount()
      if (!account.externalId || !account.id) {
        throw new Error('Must have account id')
      }
      const installation = {
        isEnterpriseInstall: false,
        teamId: account.externalId,
        enterpriseId: undefined,
        user: { token: 'token', id: 'user-id', scopes: [] },
      }
      await deleteInstallation(installation)
      const updatedAccount = await Account.query().findById(account.id)
      expect(updatedAccount?.installation).toBeNull()
    })
  })

  describe("when the account doesn't already exist", () => {
    it('does nothing', async () => {
      const externalId = 'external-id'
      const installation = {
        isEnterpriseInstall: false,
        teamId: externalId,
        enterpriseId: undefined,
        user: { token: 'token', id: 'user-id', scopes: [] },
      }
      await deleteInstallation(installation)
      expect(await Account.query().resultSize()).toBe(0)
    })
  })

  describe('when the account is enterprise', () => {
    it('uses the enterprise id', async () => {
      const account = await createSlackAccount()
      if (!account.externalId || !account.id) {
        throw new Error('Must have account id')
      }
      const installation = {
        isEnterpriseInstall: true,
        enterpriseId: account.externalId,
        teamId: undefined,
        user: { token: 'token', id: 'user-id', scopes: [] },
      }
      await deleteInstallation(installation)
      const updatedAccount = await Account.query().findById(account.id)
      expect(updatedAccount?.installation).toBeNull()
    })
  })

  describe('when externalId is missing', () => {
    it('throws an error', async () => {
      const installation = {
        isEnterpriseInstall: false,
        teamId: undefined,
        enterpriseId: undefined,
        user: { token: 'token', id: 'user-id', scopes: [] },
      }
      await expect(deleteInstallation(installation)).rejects.toThrow(
        'Must have external ID'
      )
    })
  })
})
