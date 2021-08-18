from __future__ import annotations

from datetime import datetime
from typing import List, Tuple, Union
from dataclasses import dataclass
from app.config import get_config
from abc import ABC

config = get_config()


@dataclass
class ValueObject:
  pass


@dataclass
class Event:
  pass

class Entity(object):
  def __init__(self, id: str) -> None:
      self.id = id

  def __eq__(self, other: Player) -> bool:
      if not isinstance(self, other):
        return False
      return self.id == other.id
  
  def __hash__(self) -> int:
      return hash(self.id)


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

  class Started(Event):
    pass

  # This is the player's index, player's test code and the time delta
  Move = Tuple[int, str, datetime]

  def __init__(self, id: str, players: List[Player]=[]):
    super().__init__(id)
    self.players = set(players)
    self._moves = set()
    self.start_time = datetime.now()

  def add_player(self, player: Player) -> None:
    self.players.add(player)

  def is_started(self) -> bool:
    if len(self.players) == 2:
      return True
    return False

  def time_delta(self, current_time: datetime=datetime.now()) -> datetime:
    return current_time - self.start_time

  def play(self, test_code: str, player_id: int) -> Result:
    self.add_move((player_id, test_code, self.time_delta()))
    player = self.players[abs(player_id - 1)]

    res = self.compute_result(test_code, player.code)
    return res

  def add_move(self, move: Move):
    self._moves.add(move)

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
      cls._games.pop()
    except KeyError:
      return None


def create_game(player: Player):
  game = GamePool.pop()
  if game == None:
    game = Game("123")
    GamePool.push(game)
  game.add_player(player)
  return game


def create_player(user_name: str, code: str):
  return Player(user_name, code)