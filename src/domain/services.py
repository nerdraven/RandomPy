from typing import Tuple
from src.domain.entities import create_game, Player, Game


def start_game(player: Player) -> Tuple[Game, bool]:
  game = create_game(player)
  return game, game.is_started()

def play_move():
  pass