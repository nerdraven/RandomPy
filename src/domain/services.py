from typing import Tuple
from src.domain.entities import Result, create_game, Player, Game


def start_game(player: Player) -> Tuple[Game, bool]:
  game = create_game(player)
  return game, game.is_started()

def play_move(test_code: str, player_id: str, game: Game) -> Result:
  return game.play(test_code, player_id)
