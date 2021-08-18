from __future__ import annotations

from datetime import datetime
from typing import List, Set, Tuple, Union
from dataclasses import dataclass
from src.app.config import get_config
from abc import ABC

config = get_config()


class ValueObject:
  pass


class Event:
  pass

class Entity(object):
  def __init__(self, id: str) -> None:
    self.id = id
    self.events: Set[Event] = list()

  def publish_event(self, event: Event):
    self.events.append(event)

  def __eq__(self, other: Player) -> bool:
    if not isinstance([other], Entity):
      return False
    return self.id == other.id
  
  def __hash__(self) -> int:
    return hash(self.id)

@dataclass
class Result(ValueObject):
  """The Result of a play in a Game session"""
  dead_count: int
  injured_count: int


class Player(Entity):
  """A Player in a Game session

  This is a player which is to be available only
  within a single game. This player has the information
  it needs to be valid player

  :param id: Player id
  :param code: Player's main code
  """

  def __init__(self, id: int, code: str):
    super().__init__(id)
    self.code = code


class Game(Entity):
  """A Game state

  This is a Game state with a unique set of players
  within. It tracks all the moves made, the points
  won, duration, etc.

  :param id: Game Id
  :param players: All players in a game
  """
  # This is the player's index, player's test code and the time delta
  Move = Tuple[int, str, datetime]

  @dataclass
  class Started(Event):
    pass

  @dataclass
  class Played(Event):
    move: Game.Move

  def __init__(self, id: str, players: List[Player]=[]):
    super().__init__(id)
    self.players = list(players)
    self._moves = set()
    self.start_time = datetime.now()

  # TODO: Use instead of List
  def add_player(self, player: Player) -> None:
    self.players.append(player)

  def is_started(self) -> bool:
    if len(self.players) == 2:
      self.publish_event(Game.Started())
      return True
    return False

  def play(self, test_code: str, player_id: str) -> Result:
    self._add_move((player_id, test_code, self._time_delta()))
    player = self.get_opponent(player_id)
    return self.compute_result(test_code, player.code)

  def get_opponent(self, player_id: str) -> Player:
    for player in self.players:
      if player.id != player_id:
        return player
    raise Exception("Wrong game")

  def _time_delta(self, current_time: datetime=datetime.now()) -> datetime:
    return current_time - self.start_time

  def _add_move(self, move: Move):
    self._moves.add(move)
    self.publish_event(Game.Played(move))

  @classmethod
  def compute_result(cls, test_code: str, main_code: str) -> Result:
    """Compute the Result of test_code on main_code

    This will compute the Result of a player's test_code on
    it's opponents main_code.

    :params test_code: Player's test code
    :params main_code: Opponent's main code
    """
    dead_count = injured_count = 0

    for i in range(config.SIZE):
      # Test if they match exactly at the same index
      if test_code[i] == main_code[i]:
        dead_count += 1
        continue

      # Test if it at all its in the main code
      # TODO Optimize this using `in`
      for j in range(config.SIZE):
        if test_code[i] == main_code[j]:
          injured_count += 1

    return Result(dead_count, injured_count)


# TODO: Make this follow SOLID
class GamePool:
  """\

  This contains all the games that are awaiting another player
  for it to start.
  """

  _games = set()

  @classmethod
  def push(cls, game: Game):
    cls._games.add(game)
  
  @classmethod
  def pop(cls) -> Union[Game, None]:
    try:
      return cls._games.pop()
    except KeyError:
      return None

# TODO: Refactor to make independent of GamePool
def create_game(players: List[Player]):
  game = GamePool.pop()
  if game == None:
    game = Game("123")
    GamePool.push(game)
  for player in players:
    game.add_player(player)
  return game


def create_player(user_name: str, code: str):
  return Player(user_name, code)
