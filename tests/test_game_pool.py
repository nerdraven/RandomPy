from domain.entities import create_game, create_player
from domain.repository.game_pool import FakeGamePool as GamePool
from domain.repository.game import FakeRepository as Repository

def test_create_new_game_with_incomplete_players():
  pool = GamePool()
  # repo = Repository()
  player_1 = create_player("player-1", "1234")
  game = create_game("123", [player_1], pool)

  assert pool.pop() != None