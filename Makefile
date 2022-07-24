run-server:
	cd ./server && PORT=4000 go run .
test-server:
	cd ./server && go test -v .
run-clinet:
	cd ./client && npm run dev