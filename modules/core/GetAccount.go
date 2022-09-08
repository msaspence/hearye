package core

import (
	"github.com/hearye/hearye/db"
)

type Account struct {
	DisplayName string
	Domain      string
	ExternalID  string
	Source      string
}

func GetAccount(account Account) (db.Account, error) {
	foundAccount, found, findErr := db.FindByExternalIDAndSource(account.ExternalID, account.Source)
	if findErr != nil {
		return db.Account{}, findErr
	}
	if found {
		_, _ = db.UpdateAccount(foundAccount.ID, db.AccountInput{DisplayName: account.DisplayName, Domain: account.Domain, ExternalID: account.ExternalID, Source: account.Source})
		return foundAccount, nil
	}

	createdAccount, createErr := db.CreateAccount(db.AccountInput{DisplayName: account.DisplayName, Domain: account.Domain, ExternalID: account.ExternalID, Source: account.Source})
	if createErr != nil {
		return db.Account{}, createErr
	}

	return createdAccount, nil
}
