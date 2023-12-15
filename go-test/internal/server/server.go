package server

import (
    "github.com/gorilla/mux"
    "fmt"
    "net/http"
    "html/template"
    "github.com/gorilla/websocket"
    "log"
    "io"
)

func indexHandler(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Content-Type", "text/html")
    template.Must(template.ParseFiles("static/index.html")).Execute(w, nil)
}

var upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

func handleConnection(w http.ResponseWriter, r *http.Request) {
	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Println(err)
		return
	}
	defer conn.Close()

	for {
		messageType, reader, err := conn.NextReader()
		if err != nil {
			log.Println(err)
			return
		}

		if messageType == websocket.BinaryMessage {
			go handleFile(conn, reader)
		} else if messageType == websocket.TextMessage {
			go handleText(conn, reader)
		}
	}
}

func handleFile(conn *websocket.Conn, reader io.Reader) {
	// Read the file data
	data, err := io.ReadAll(reader)
	if err != nil {
		log.Println("Error reading file data:", err)
		return
	}

	// Echo the file data back as binary message
	if err := conn.WriteMessage(websocket.BinaryMessage, data); err != nil {
		log.Println("Error echoing file data:", err)
	}
}

func handleText(conn *websocket.Conn, reader io.Reader) {
	// Read the text data
	data, err := io.ReadAll(reader)
	if err != nil {
		log.Println("Error reading text data:", err)
		return
	}

	// Echo the text data back as text message
	if err := conn.WriteMessage(websocket.TextMessage, data); err != nil {
		log.Println("Error echoing text data:", err)
	}
}

// go routine to handle websocket connections
func StartServer() {
    r := mux.NewRouter()
    r.HandleFunc("/", indexHandler)
    r.HandleFunc("/ws", handleConnection)
    fmt.Println("Server started on port 3001")
    http.ListenAndServe(":3001", r)
}
