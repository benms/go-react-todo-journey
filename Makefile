run-server:
	cd ./server && PORT=4000 go run .
test-server:
	cd ./server && go test -v .
run-clinet:
	cd ./client && VITE_BACKEND_URL=http://localhost:4000/api npm run dev