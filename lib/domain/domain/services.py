import random
from typing import Tuple

from domain.repository.game_pool import AbstractGamePool
from domain.repository.game import AbstractRepository
from domain.repository.game_pool import AbstractGamePool
from domain.entities import Result, create_game, Player, Game


def start_game(player: Player, pool: AbstractGamePool, repo: AbstractRepository) -> Tuple[Game, bool]:
  id = random.randint(1000, 9999)
  game = create_game(id, player, pool)
  if game.is_started():
    repo.add(game)
  return game, game.is_started()

def play_move(
  test_code: str,
  player_id: str,
  game_id: str,
  game_repo: AbstractRepository
) -> Result:
  try:
    game = game_repo.get(game_id)
    res = game.play(test_code, player_id)
    game_repo.update(game_id, game)
    return res
  except Exception:
    raise Exception("Game not found")
