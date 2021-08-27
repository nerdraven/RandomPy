import { Game } from "../entities";

interface IGamePool {
  push: (game: Game) => void;
  pop: () => Game;
}

export class FakeGamePool implements IGamePool {
  constructor(
    private readonly pool: Array<Game> = []
  ){}

  push(game: Game): void {
    this.pool.push(game);
  }

  pop(): Game {
    const game = this.pool.pop();
    if(typeof game == "undefined")
      throw new Error("Pool Empty");
    return game;
  }
}