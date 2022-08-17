module github.com/hearye/hearye/api

go 1.19

replace github.com/hearye/hearye/env => ../../modules/env

replace github.com/hearye/hearye/persistence => ../../modules/persistence

replace github.com/hearye/hearye/core => ../../modules/core

require (
	github.com/gin-gonic/gin v1.8.1
	github.com/hearye/hearye/core v0.0.0-00010101000000-000000000000
	github.com/hearye/hearye/env v0.0.0-00010101000000-000000000000
	github.com/hearye/hearye/persistence v0.0.0-00010101000000-000000000000
	github.com/slack-go/slack v0.11.2
)

require (
	github.com/cespare/reflex v0.3.1 // indirect
	github.com/creack/pty v1.1.11 // indirect
	github.com/fsnotify/fsnotify v1.4.7 // indirect
	github.com/gin-contrib/sse v0.1.0 // indirect
	github.com/go-playground/locales v0.14.0 // indirect
	github.com/go-playground/universal-translator v0.18.0 // indirect
	github.com/go-playground/validator/v10 v10.11.0 // indirect
	github.com/goccy/go-json v0.9.10 // indirect
	github.com/google/go-cmp v0.5.8 // indirect
	github.com/gorilla/websocket v1.5.0 // indirect
	github.com/jackc/chunkreader/v2 v2.0.1 // indirect
	github.com/jackc/pgconn v1.12.1 // indirect
	github.com/jackc/pgio v1.0.0 // indirect
	github.com/jackc/pgpassfile v1.0.0 // indirect
	github.com/jackc/pgproto3/v2 v2.3.0 // indirect
	github.com/jackc/pgservicefile v0.0.0-20200714003250-2b9c44734f2b // indirect
	github.com/jackc/pgtype v1.11.0 // indirect
	github.com/jackc/pgx/v4 v4.16.1 // indirect
	github.com/jinzhu/inflection v1.0.0 // indirect
	github.com/jinzhu/now v1.1.5 // indirect
	github.com/joho/godotenv v1.4.0 // indirect
	github.com/json-iterator/go v1.1.12 // indirect
	github.com/kballard/go-shellquote v0.0.0-20180428030007-95032a82bc51 // indirect
	github.com/leodido/go-urn v1.2.1 // indirect
	github.com/mattn/go-isatty v0.0.14 // indirect
	github.com/modern-go/concurrent v0.0.0-20180306012644-bacd9c7ef1dd // indirect
	github.com/modern-go/reflect2 v1.0.2 // indirect
	github.com/ogier/pflag v0.0.1 // indirect
	github.com/pelletier/go-toml/v2 v2.0.2 // indirect
	github.com/pkg/errors v0.9.1 // indirect
	github.com/satori/go.uuid v1.2.0 // indirect
	github.com/ugorji/go/codec v1.2.7 // indirect
	golang.org/x/crypto v0.0.0-20220722155217-630584e8d5aa // indirect
	golang.org/x/net v0.0.0-20220809012201-f428fae20770 // indirect
	golang.org/x/sys v0.0.0-20220811171246-fbc7d0a398ab // indirect
	golang.org/x/text v0.3.7 // indirect
	google.golang.org/protobuf v1.28.1 // indirect
	gopkg.in/yaml.v2 v2.4.0 // indirect
	gorm.io/driver/postgres v1.3.8 // indirect
	gorm.io/gorm v1.23.8 // indirect
)
