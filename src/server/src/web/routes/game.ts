import { playMove, startGame } from "../../domain/services";
import { Router } from "express";
import { createPlayer } from "../../domain/entities";
import { FakeGamePool } from "../../domain/repositories/gamePool";
import { FakeRepository } from "../../domain/repositories/game";

const router = Router();
const pool = new FakeGamePool();
const repo = new FakeRepository();

router.post("/start-game", (req, res) => {
  const username: string = req.body.username;
  const mainCode: string = req.body.mainCode;

  const player = createPlayer(username, mainCode);
  const [game, isStarted] = startGame([player], pool, repo);

  res.json({ gameId: game.id, isStarted });
});

router.post("/play-move", (req, res) => {
  const testCode: string = req.body.testCode;
  const playerId: string = req.body.playerId;
  const gameId: string = req.body.gameId;

  const result = playMove(testCode, playerId, gameId, repo);

  res.json(result);
});

export default router;
