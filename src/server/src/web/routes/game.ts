import { Router } from "express";
import { IConnect, IPlayGame } from "../../types";
import { createPlayer } from "../../domain/entities";
import { playMove, startGame } from "../../domain/services";
import { FakeRepository } from "../../domain/repositories/game";
import { FakeGamePool } from "../../domain/repositories/gamePool";

const router = Router();
const pool = new FakeGamePool();
const repo = new FakeRepository();

router.post("/start-game", (req, res) => {
  const username: string = (<IConnect>req.body).userName;
  const mainCode: string = (<IConnect>req.body).mainCode;

  console.log("userName", username);
  console.log("mainCode", mainCode);

  const player = createPlayer(username, mainCode);
  const [game, isStarted] = startGame([player], pool, repo);

  res.json({ gameId: game.id, isStarted });
});

router.post("/play-move", (req, res) => {
  const testCode: string = (<IPlayGame>req.body).testCode;
  const userName: string = (<IPlayGame>req.body).userName;
  const gameId: string = (<IPlayGame>req.body).gameId;

  console.log("userName", userName);
  console.log("testCode", testCode);
  console.log("gameId", gameId);

  const result = playMove(testCode, userName, gameId, repo);

  res.json(result);
});

export default router;
