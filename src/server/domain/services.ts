import { createGame, Game, Player, Result } from "./entities";
import { IRepository } from "./repositories/game";
import { IGamePool } from "./repositories/gamePool";
import { nanoid } from "nanoid";

export function startGame(
  player: Array<Player>,
  pool: IGamePool,
  repo: IRepository
): [Game, boolean] {
  const id = nanoid();
  const game = createGame(id, player, pool);
  if (game.isStarted()) {
    console.log("Game added to repo", game.id);
    repo.add(game);
  }
  return [game, game.isStarted()];
}

export function playMove(
  testCode: string,
  playerId: string,
  gameId: string,
  repo: IRepository
): Result {
  try {
    // TODO: Repo is wrong
    const game = repo.get(gameId);
    const res = game.play(testCode, playerId);
    return res;
  } catch (e) {
    throw new Error(e);
  }
}
