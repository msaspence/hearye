api/build:
	cd ./apps/api; make build; cd -

api/run:
	cd ./apps/api; make run; cd -

api/watch:
	ulimit -n 1000 #increase the file watch limit, might required on MacOS
	reflex --start-service --regex=['\.go$$'] make api/run

db/migrate:
	cd ./modules/migration-runner; make migrate