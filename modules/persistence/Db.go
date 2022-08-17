package persistence

import (
	"fmt"

	"github.com/hearye/hearye/env"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func Db() *gorm.DB {
	dsn := env.Get("DB_DSN")
	fmt.Printf("Connecting to %s\n", dsn)
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}
	return db
}
