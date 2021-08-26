import { Game } from "../entities";


interface IRepository {
  add: (game: Game) => void;
  get: (gameId: string) => Game;
  update: (gameId: string, game: Game) => Game;
}

export class FakeRepository implements IRepository {
  constructor(
    private readonly db: Record<string, Game> = {}
  ){}

  add(game: Game): void {
    this.db[game.id] = game;
  }
  update(gameId: string, game: Game): Game {
    this.db[gameId] = game;
    return game;
  }
  get(gameId: string): Game {
    try {
      return this.db[gameId];
    } catch (error) {
      throw new Error("Game not found");
    }
  }
}