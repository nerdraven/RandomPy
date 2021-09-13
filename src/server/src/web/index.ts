import morgan from "morgan";
import express from "express";

import game from "./routes/game";
import config from "../app/config";
import { createServer } from "http";
import { createWebSocketServer } from "./listeners";
import { FakeRepository } from "../domain/repositories/game";
import { FakeGamePool } from "../domain/repositories/gamePool";


const PORT = config.core.PORT;

const pool = new FakeGamePool();
const repo = new FakeRepository();

const app = express();
const server = createServer(app);

createWebSocketServer({ server }, pool, repo);
app.use(express.json());
app.use(game);
app.use(morgan("combined"));

app.get("/", (_, res) => {
  res.send("Okay");
});

server.listen(PORT, () => {
  console.log("Started server at", PORT);
});
