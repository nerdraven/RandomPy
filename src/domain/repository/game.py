from abc import ABC, abstractmethod
from typing import Dict, List, Union
from domain.entities import Game


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
  
  @abstractmethod
  def update(self, game_id: str, game: Game) -> Game:
    raise NotImplementedError


class FakeRepository(AbstractRepository):
  def __init__(self, game: List[Game]=[]) -> None:
      self._db: Dict = dict()

  def add(self, game: Game) -> None:
    self._db[game.id] = game

  def update(self, game_id: str, game: Game) -> Game:
    self._db[game_id] = game
    return game
 
  def get(self, game_id: str) -> Union[Game, None]:
    try:
      return self._db[game_id]
    except KeyError as e:
      raise Exception("Game not found") from e
