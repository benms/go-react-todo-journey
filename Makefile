run-server:
	cd ./server && go run .
test-server:
	cd ./server && go test -v .
run-clinet:
	cd ./client && npm run dev