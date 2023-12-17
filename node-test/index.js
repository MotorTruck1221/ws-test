//basic http server (with websocket)
import http from 'http';
import { WebSocketServer } from 'ws'
import fs from 'fs';
import path from 'path';
const __dirname = path.resolve();

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        fs.readFile(path.join(__dirname, 'index.html'), (err, data) => {
            if (err) throw err;
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        });
    }
});

const wss = new WebSocketServer({ server });
wss.on('connection', (ws) => {
    //determine if the message is binary or text 
    ws.on('message', (message, isBinary) => {
        if (isBinary) {
            ws.send(message, { binary: true });
        }
        else {
            ws.send(message, { binary: false });
        }
    });
});

server.listen(3002, () => console.log('Server started on port 3002'));
