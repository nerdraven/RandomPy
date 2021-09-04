import { Game } from "../entities";


export interface IRepository {
  add: (game: Game) => void;
  get: (gameId: string) => Game;
  update: (gameId: string, game: Game) => Game;
}

export class FakeRepository implements IRepository {
  constructor(
    public readonly db: Record<string, Game> = {}
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
      const data = this.db[gameId];
      if(!data)
        throw new Error("");
      return data;
    } catch (error) {
      throw new Error("Game was not saved in Repo");
    }
  }
}