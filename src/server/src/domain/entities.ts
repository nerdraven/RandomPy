import { ValueObject, DomainEvent, Entity } from "./base";
import { IGamePool } from "./repositories/gamePool";

type Move = [string, string, number];

export class Result implements ValueObject {
  constructor(public deadCount: number, public injuredCount: number) {}
}

export class Player extends Entity {
  constructor(public readonly id: string, public readonly code: string) {
    super(id);
  }
}

export class Started extends DomainEvent {}
export class Played extends DomainEvent {}

export class Game extends Entity {
  private readonly players: Array<Player>;
  private readonly startTime: Date;
  private moves: Array<Move> = [];
  constructor(id: string, players: Array<Player> = []) {
    super(id);
    this.players = players;
    this.startTime = new Date();
  }

  addPlayer(player: Player): void {
    if (this.isStarted()) throw new Error("Game already complete");
    this.players.push(player);
  }

  isStarted(): boolean {
    if (this.players.length == 2) {
      this.publishEvent(new Started());
      return true;
    }
    return false;
  }

  play(testCode: string, playerId: string): Result {
    this.addMove([playerId, testCode, this.timeDelta()]);
    const player = this.getOpponent(playerId) as Player;
    return Game.computeResult(testCode, player.code);
  }

  private getOpponent(playerId: string): Player | void {
    const ids: Array<string> = [];
    this.players.forEach((player) => {
      ids.push(player.id);
    });
    if (!ids.includes(playerId)) {
      throw new Error("Player not found");
    }
    for (let i = 0; i <= this.players.length - 1; i++) {
      const player = this.players[i];
      if (player.id == playerId) return this.players[1 - i];
    }
  }

  public static computeResult(testCode: string, mainCode: string): Result {
    let deadCount = 0,
      injuredCount = 0;

    for (let i = 0; i < 4; i++) {
      if (testCode[i] == mainCode[i]) {
        deadCount += 1;
        continue;
      }
      for (let j = 0; j < 4; j++) {
        if (testCode[i] == mainCode[j]) {
          injuredCount += 1;
        }
      }
    }

    return new Result(deadCount, injuredCount);
  }

  private timeDelta(now: Date = new Date()): number {
    return now.getSeconds() - this.startTime.getSeconds();
  }

  private addMove(move: Move) {
    this.moves.push(move);
    this.publishEvent(new Played());
  }
}

export class SocketConnection extends Entity {
  constructor(public readonly groupId: string) {
    super(groupId);
  }
}

/* Factories */

export function createGame(
  id: string,
  players: Array<Player>,
  pool: IGamePool
): Game {
  let game: Game;
  try {
    game = pool.pop();
  } catch (error) {
    game = new Game(id);
    pool.push(game);
  }
  players.forEach((player) => {
    (<Game>game).addPlayer(player);
  });
  return game;
}

export function createPlayer(userName: string, code: string): Player {
  return new Player(userName, code);
}
