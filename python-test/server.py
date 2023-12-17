from typing import Union
from fastapi import FastAPI
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi import WebSocket

app = FastAPI()

@app.get("/")
def read_root():
    return HTMLResponse(content=open("static/index.html", "r").read())

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    while True:
        data = await websocket.receive()
        if isinstance(data["text"], str):
            await websocket.send_text(data["text"])
        elif isinstance(data["bytes"], bytes):
            await websocket.send_bytes(data["bytes"])
