import WebSocket from "ws";

export interface IConnect {
  userName: string;
  mainCode: string;
}

export interface IPlayGame {
  userName: string;
  testCode: string;
  gameId: string;
}

export interface IWebSocket extends WebSocket {
  game?: string;
}
