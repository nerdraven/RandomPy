from datetime import datetime
from typing import List, Tuple
from dataclasses import dataclass
from app.config import get_config

config = get_config()


@dataclass
class Result:
  """The Result of a play in a Game session"""
  dead_count: int
  injured_count: int


class Player(object):
  """A Player in a Game session

  This is a player which is to be available only
  within a single game. This player has the information
  it needs to be valid player
  :param id: Player id
  :param code: Player's main code
  """

  def __init__(self, id: int, code: str):
    self.id = id
    self.code = code


class Game(object):
  """A Game state

  This is a Game state with a unique set of players
  within. It tracks all the moves made, the points
  won, duration, etc.
  :param id: Game Id
  :param players: All players in a game
  """
  # This is the player's index, player's test code and the time delta
  Move = Tuple[int, str, datetime]

  def __init__(self, id: str, players: List[Player]) -> None:
      self.id = id
      self.players = players
      self._moves = set()
      self.start_time = datetime.now()
    
  def time_delta(self, current_time: datetime=datetime.now()):
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
    """
    dead_count = injured_count = 0

    for i in range(config.SIZE):
      if test_code[i] == main_code[i]:
        dead_count += 1
        continue

      for j in range(config.SIZE):
        if test_code[i] == main_code[j]:
          injured_count += 1

    return Result(dead_count, injured_count)