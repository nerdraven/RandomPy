
class ValueObject {}
class DomainEvent {}

export class Result implements ValueObject {
  constructor(public deadCount: number, public injuredCount: number) {}
}

type Move = [string, string, number];

class Entity {
  constructor(
    public readonly id: string,
    private events: Array<DomainEvent> = []
  ) {}

  publishEvent(event: DomainEvent) {
    this.events.push(event);
  }
}

export class Player extends Entity {
  public readonly code: string;
  constructor(id: string, code: string) {
    super(id);
    this.code = code;
  }
}


class Started extends DomainEvent {}
class Played extends DomainEvent {}

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
    if (!(playerId in ids)) {
      throw new Error("Wrong Game");
    }

    for (let i = 0; i <= this.players.length; i++) {
      const player = this.players[i];
      if (player.id != playerId) return this.players[i];
    }
  }


  public static computeResult(testCode: string, mainCode: string): Result {
    let deadCount = 0,
      injuredCount = 0;

    for (let i = 0; i <= 4; i++) {
      if (testCode[i] == mainCode[i]) {
        deadCount += 1;
        continue;
      }
      for (let j = 0; i <= 4; i++) {
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

/* Factories */

export function createGame(id: string, players: Array<Player>, pool: Array<Game>): Game {
  let game = pool.pop();
  if(game == null){
    game = new Game(id);
    pool.push(game);
  }
  players.forEach(player => {
    (<Game>game).addPlayer(player);
  });
  return game;
}

export function createPlayer(userName: string, code: string): Player {
  return new Player(userName, code);
}