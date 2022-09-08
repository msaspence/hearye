package migrations

import (
	gormigrate "github.com/go-gormigrate/gormigrate/v2"
	uuid "github.com/satori/go.uuid"

	"gorm.io/gorm"
)

func M201608301401_createUsers() *gormigrate.Migration {
	return &gormigrate.Migration{
		ID: "201608301401",
		Migrate: func(tx *gorm.DB) error {
			type User struct {
				gorm.Model
				ID          uuid.UUID `gorm:"type:char(36);primary_key"`
				ExternalID  string
				DisplayName string
				RealName    string
				Source      string
				UserName    string
			}
			err := tx.AutoMigrate(&User{})
			return err
		},
		Rollback: func(tx *gorm.DB) error {
			return tx.Migrator().DropTable("users")
		},
	}
}
