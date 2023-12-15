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
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

type messagePayload struct {
	MessageType int
	Message     []byte
	IsBinary    bool // New field to indicate if the message is binary
}

func handleConnection(w http.ResponseWriter, r *http.Request) {
	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Println(err)
		return
	}
	defer conn.Close()

	// Create a buffered channel to communicate between handleConnection and writeMessage
	messageChannel := make(chan messagePayload, 10) // Adjust the buffer size based on your needs

	// Start the writeMessage goroutine
	go writeMessage(conn, messageChannel)

	errorChannel := make(chan error)
	go handleErrors(conn, errorChannel)

	for {
		messageType, p, err := conn.ReadMessage()
		if err != nil {
			errorChannel <- err
			return
		}

		// Determine if the message is binary or text
		isBinary := messageType == websocket.BinaryMessage

		// Send the received message to the writeMessage goroutine
		messageChannel <- messagePayload{MessageType: messageType, Message: p, IsBinary: isBinary}
	}
}

func writeMessage(conn *websocket.Conn, messageChannel <-chan messagePayload) {
	defer conn.Close()

	// Reuse the response slice
	response := make([]byte, 0, 256)

	for {
		// Wait for a message from the channel
		payload, ok := <-messageChannel
		if !ok {
			return
		}

		// Process the received message (you can add your logic here)
		if payload.IsBinary {
			fmt.Println("Received binary message")
			// Handle binary message logic
		} else {
			fmt.Printf("Received text message: %s\n", payload.Message)
			// Handle text message logic
		}

		// Update the response content
		response = append(response[:0], "Server response: "...)
		response = append(response, payload.Message...)

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

func handleErrors(conn *websocket.Conn, errorChannel <-chan error) {
	for {
		err, ok := <-errorChannel
		if !ok {
			return
		}

		log.Printf("Error: %v", err)
		conn.Close()
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
