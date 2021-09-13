import WebSocket from "ws";
import { createPlayer } from "../../domain/entities";
import { playMove, startGame } from "../../domain/services";
import { IConnect, IPlayGame, IWebSocket } from "../../types";
import { IRepository } from "../../domain/repositories/game";
import { IGamePool } from "../../domain/repositories/gamePool";

interface IData {
  type: "CONNECT" | "MESSAGE";
  message: unknown;
}

export const createWebSocketServer = (
  options: WebSocket.ServerOptions, pool: IGamePool, repo: IRepository
): WebSocket.Server => {
  const wss = new WebSocket.Server(options);

  wss.on("connection", (socket: IWebSocket): void => {
    socket.on("message", (data) => {
      const { type, message }: IData = JSON.parse(data.toString());

      if (type == "CONNECT") {
        const { userName, mainCode } = message as IConnect;
        const user = createPlayer(userName, mainCode);
        const [game, isStarted] = startGame([user], pool, repo);
        socket.game = game.id;
        if (isStarted) {
          socket.emit("broadcast", {
            game: game.id,
            isStarted,
          });
        }

        socket.send(JSON.stringify({ gameId: game.id, isStarted }));
      } else if (type == "MESSAGE") {
        const { testCode, userName, gameId } = message as IPlayGame;
        const result = playMove(testCode, userName, gameId, repo);

        socket.emit("broadcast", {
          game: gameId,
          result: JSON.stringify(result)
        });
      }
    });

    socket.on("close", (code, reason) => {
      console.log("code", code);
      console.log("reason", reason);
    });

    socket.on("broadcast", (data) => {
      wss.clients.forEach((client: IWebSocket) => {
        if (client.readyState == WebSocket.OPEN) {
          if (client.game == data.game) {
            client.send(JSON.stringify(data));
          }
        }
      });
    });

  });

  return wss;
};
