package persistence

import (
	"errors"

	uuid "github.com/satori/go.uuid"
	"gorm.io/gorm"
)

type Account struct {
	gorm.Model
	ID          uuid.UUID `gorm:"type:char(36);primary_key"`
	DisplayName string
	Domain      string
	ExternalID  string
	Source      string
}

type AccountInput struct {
	DisplayName string
	Domain      string
	ExternalID  string
	Source      string
}

const (
	Slack = "slack"
)

func (account *Account) BeforeCreate(tx *gorm.DB) error {
	account.ID = uuid.NewV4()
	return nil
}

func FindByExternalIDAndSource(externalId string, source string) (Account, bool, error) {
	db := Db()
	var account Account
	result := db.First(&account).Where("external_id = ? AND source = ?", externalId, source)
	if errors.Is(result.Error, gorm.ErrRecordNotFound) {
		return Account{}, false, nil
	} else if result.Error != nil {
		return Account{}, false, result.Error
	}
	return account, true, nil
}

func CreateAccount(input AccountInput) (Account, error) {
	db := Db()
	account := Account{ExternalID: input.ExternalID, Source: input.Source, DisplayName: input.DisplayName, Domain: input.Domain}
	result := db.Create(&account)
	if result.Error != nil {
		return Account{}, result.Error
	}
	return account, nil
}

func UpdateAccount(accountID uuid.UUID, account AccountInput) (Account, error) {
	db := Db()
	returnedAccount := Account{}
	result := db.Model(&returnedAccount).Where("id = ?", accountID).Updates(Account{ExternalID: account.ExternalID, Source: account.Source, DisplayName: account.DisplayName, Domain: account.Domain})
	if result.Error != nil {
		return Account{}, result.Error
	}
	return returnedAccount, nil
}
