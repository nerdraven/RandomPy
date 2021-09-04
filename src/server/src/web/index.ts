import morgan from "morgan";
import express from "express";
import game from "./routes/game";
import config from "../app/config";

const server = express();
const PORT = config.core.PORT;

server.use(express.json());
server.use(game);
server.use(morgan("combined"));

server.get("/", (_, res) => {
  res.send("Okay");
});

server.listen(PORT, () => {
  console.log("Started server at", PORT);
});
