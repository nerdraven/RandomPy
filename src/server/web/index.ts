import express from "express";
import config from "../app/config";
import morgan from "morgan";

const PORT = config.core.PORT;

const server = express();
server.use(morgan("combined"));

server.get("/", (_, res) => {
  res.send("Okay");
});

server.listen(PORT, () => {
  console.log("Started server at", PORT);
});