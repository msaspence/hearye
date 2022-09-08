package main

import (
	"log"

	"github.com/go-gormigrate/gormigrate/v2"
	"github.com/hearye/hearye/db"
	"github.com/hearye/hearye/db/migrations"
	"github.com/hearye/hearye/env"
)

// const (
// Slack = "slack"
// )

func main() {
	env.Load()
	db := db.Db()

	m := gormigrate.New(db, gormigrate.DefaultOptions, []*gormigrate.Migration{
		migrations.M201608301400_createAccounts(),
		migrations.M201608301401_createUsers(),
	})

	if err := m.Migrate(); err != nil {
		log.Fatalf("Could not migrate: %v", err)
	}
	log.Printf("Migration did run successfully")
}
