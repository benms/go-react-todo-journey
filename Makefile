run-server:
	cd ./server && ALLOW_ORIGIN_FROM=http://localhost:3000 PORT=4000 go run .
test-server:
	cd ./server && go test -v .
run-clinet:
	cd ./client && VITE_BACKEND_URL=http://localhost:4000/api npm run dev