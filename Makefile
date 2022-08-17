api/build:
	cd ./apps/api; go build -o ./tmp/api ./main.go; cd -

api/run: api/build
	cd ./apps/api; ./tmp/api; cd -

api/watch:
	ulimit -n 1000 #increase the file watch limit, might required on MacOS
	reflex --start-service --regex=['\.go$$'] make api/run