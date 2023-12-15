package server

import (
    "github.com/gorilla/mux"
    "fmt"
    "net/http"
    "html/template"
    "github.com/gorilla/websocket"
    "log"
)

func indexHandler(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Content-Type", "text/html")
    template.Must(template.ParseFiles("static/index.html")).Execute(w, nil)
}

var upgrader = websocket.Upgrader{
	ReadBufferSize:  3072,
	WriteBufferSize: 3072,
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

type messagePayload struct {
	MessageType int
	Message     []byte
}

func handleConnection(w http.ResponseWriter, r *http.Request) {
	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Println(err)
		return
	}
	defer conn.Close()

	// Create a channel to communicate between handleConnection and writeMessage
	messageChannel := make(chan messagePayload)

	// Start the writeMessage goroutine
	go writeMessage(conn, messageChannel)

	for {
		messageType, p, err := conn.ReadMessage()
		if err != nil {
			log.Println(err)
			return
		}

		// Send the received message to the writeMessage goroutine
		messageChannel <- messagePayload{MessageType: messageType, Message: p}
	}
}

func writeMessage(conn *websocket.Conn, messageChannel <-chan messagePayload) {
	defer conn.Close()

	for {
		// Wait for a message from the channel
		payload, ok := <-messageChannel
		if !ok {
			return
		}

		// Process the received message (you can add your logic here)
		fmt.Printf("Received message: %s\n", payload.Message)

		// Generate a response
		response := []byte("Server response: " + string(payload.Message))

		// Check if the connection is still open before writing
		err := conn.WriteMessage(payload.MessageType, response)
		if err != nil {
			if websocket.IsUnexpectedCloseError(err, websocket.CloseGoingAway, websocket.CloseAbnormalClosure) {
				log.Printf("Error writing message: %v", err)
			}
			return
		}
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
