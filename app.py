import os
import random
from typing import List
from dataclasses import dataclass

SIZE = 4
random.seed(os.urandom(16))

class IdGenerator:
  def generate(self):
    return random.randint(10000, 999999)

@dataclass
class Result:
  dead_count: int
  injured_count: int


class Player(object):
  """ This is a player in a game """

  def __init__(self, id: int, code: str) -> None:
    self.id = id
    self.code = code

class Game(object):
  """The Game state

  :param id: Game Id
  :param players: All players in a game
  """

  def __init__(self, id: str, players: List[Player]) -> None:
      self.id = id
      self.players = players
      self.session = set()
      self.code = self.generate_code()

  def play(self, test_code: str, player_id: int) -> Result:
    player = self.players[abs(player_id - 1)]
    res = self.compute_result(test_code, player.code)
    return res

  @classmethod
  def compute_result(cls, test_code: str, player: str) -> Result:
    dead_count = injured_count = 0

    for i in range(SIZE):
      if test_code[i] == player[i]:
        dead_count += 1
        continue

      for j in range(SIZE):
        if test_code[i] == player[j]:
          injured_count += 1

    return Result(dead_count, injured_count)


  def generate_code(self) -> int:
    return random.randint(1000, 9999)