from abc import ABC, abstractmethod
from typing import Dict, Union
from src.domain.entities import Game

class AbstractRepository(ABC):

  @abstractmethod
  def __init__(self) -> None:
      raise NotImplemented

  @abstractmethod
  def add(self, game: Game) -> None:
    raise NotImplementedError

  @abstractmethod
  def get(self, game_id: str) -> Game:
    raise NotImplementedError

class FakeRepository(AbstractRepository):
  def __init__(self) -> None:
      self._db: Dict = dict()

  def add(self, game: Game) -> None:
    self._db[game.id] = game
 
  def get(self, game_id: str) -> Union[Game, None]:
    try:
      return self._db[game_id]
    except KeyError:
      return None