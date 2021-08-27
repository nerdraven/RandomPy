import { createGame, Game, Player, Result } from "./entities";


export function startGame(player: Array<Player>, pool: Array<Game>, repo: Array<Game>): [Game, boolean] {
  const id = "Hello";
  const game = createGame(id, player, pool);
  if(game.isStarted())
    repo.push(game);
  return [game, game.isStarted()];
}

export function playMove(testCode: string, playerId: string, repo: Array<Game>): Result {
  try {
    // TODO: Repo is wrong
    const game = repo[0];
    const res = game.play(testCode, playerId);
    repo[0] = game;
    return res;
  } catch (e) {
    throw new Error("Game not found");
  }
}