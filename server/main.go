package main

import (
	"fmt"
	"log"

	"example.com/go-react-app/pkg/server"
)

func main() {
	app := server.AppWithRoutes()

	port := ":4000"
	fmt.Printf("Listen on port http://0.0.0.0%s", port)
	log.Fatal(app.Listen(port))
}
