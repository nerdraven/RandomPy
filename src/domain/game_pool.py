from typing import Union
from abc import ABC, abstractmethod
from src.domain.entities import Game


class AbstractGamePool(ABC):
  """\

  This contains all the games that are awaiting another player
  for it to start.
  """

  @abstractmethod
  def push(cls, game: Game) -> None:
    raise NotImplementedError

  @abstractmethod
  def pop(cls) -> Union[Game, None]:
    raise NotImplementedError


class FakeGamePool(AbstractGamePool):
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
