import EventEmitter from "event-emitter";
import WebSocket from "websocket";

const emitter = EventEmitter();
const ws = new WebSocket.w3cwebsocket("ws://localhost:5000");

ws.onerror = () => {
  emitter.emit("error", { message: "ERROR" });
};

ws.onopen = () => {
  emitter.emit("open", { message: "OPEN" });
};

ws.onmessage = (message) => {
  emitter.emit("message", message);
};

ws.onclose = () => {
  emitter.emit("close", { message: "CLOSED" });
};

export function sendMessage(message: string): void {
  ws.send(message);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function subscribe(name: string, cb: (d: any) => void): void {
  emitter.subscribe(name, cb);
}


emitter.subscribe("open", (data) => {
  console.log(data);
});

emitter.subscribe("message", (data) => {
  console.log(data);
});

emitter.subscribe("close", (data) => {
  console.log(data);
});

emitter.subscribe("error", (data) => {
  console.log(data);
});
