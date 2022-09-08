package migrations

import (
	gormigrate "github.com/go-gormigrate/gormigrate/v2"
	uuid "github.com/satori/go.uuid"

	"gorm.io/gorm"
)

func M201608301400_createAccounts() *gormigrate.Migration {
	return &gormigrate.Migration{
		ID: "201608301400",
		Migrate: func(tx *gorm.DB) error {
			type Account struct {
				gorm.Model
				ID          uuid.UUID `gorm:"type:char(36);primary_key"`
				DisplayName string
				Domain      string
				ExternalID  string
				Source      string
			}
			err := tx.AutoMigrate(&Account{})
			return err
		},
		Rollback: func(tx *gorm.DB) error {
			return tx.Migrator().DropTable("accounts")
		},
	}
}
