package core

import (
	"github.com/hearye/hearye/persistence"
)

type Account struct {
	DisplayName string
	Domain      string
	ExternalID  string
	Source      string
}

func GetAccount(account Account) (persistence.Account, error) {
	foundAccount, found, findErr := persistence.FindByExternalIDAndSource(account.ExternalID, account.Source)
	if findErr != nil {
		return persistence.Account{}, findErr
	}
	if found {
		_, _ = persistence.UpdateAccount(foundAccount.ID, persistence.AccountInput{DisplayName: account.DisplayName, Domain: account.Domain, ExternalID: account.ExternalID, Source: account.Source})
		return foundAccount, nil
	}

	createdAccount, createErr := persistence.CreateAccount(persistence.AccountInput{DisplayName: account.DisplayName, Domain: account.Domain, ExternalID: account.ExternalID, Source: account.Source})
	if createErr != nil {
		return persistence.Account{}, createErr
	}

	return createdAccount, nil
}
