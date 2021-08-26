from __future__ import annotations

from typing import Union
from abc import ABC, abstractmethod
from domain import entities


class AbstractGamePool(ABC):
  """\

  This contains all the games that are awaiting another player
  for it to start.
  """

  @abstractmethod
  def push(self, game: entities.Game) -> None:
    raise NotImplementedError

  @abstractmethod
  def pop(self) -> Union[entities.Game, None]:
    raise NotImplementedError


class FakeGamePool(AbstractGamePool):

  def __init__(self) -> None:
      self._games = set()

  def push(self, game: entities.Game):
    self._games.add(game)

  def pop(self) -> Union[entities.Game, None]:
    try:
      return self._games.pop()
    except KeyError:
      return None
