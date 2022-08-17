package main

import (
	"log"

	"github.com/go-gormigrate/gormigrate/v2"
	"github.com/hearye/hearye/env"
	"github.com/hearye/hearye/persistence"
	"github.com/hearye/hearye/persistence/migrations"
)

// const (
// Slack = "slack"
// )

func main() {
	env.Load()
	db := persistence.Db()

	m := gormigrate.New(db, gormigrate.DefaultOptions, []*gormigrate.Migration{
		// create accounts table
		migrations.M201608301400_createAccounts(),
	})

	if err := m.Migrate(); err != nil {
		log.Fatalf("Could not migrate: %v", err)
	}
	log.Printf("Migration did run successfully")
}
