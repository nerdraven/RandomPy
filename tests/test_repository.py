from domain.entities import create_player
from domain.services import play_move, start_game
from domain.repository.game import FakeRepository as Repository
from domain.repository.game_pool import FakeGamePool as GamePool

def test_data_saved_in_game_pool():
  pool = GamePool()
  repo = Repository()
  player_1 = create_player("player-1", "1234")
  _, _ = start_game([player_1], pool, repo)

  assert pool.pop != None


def test_data_saved_in_repository():
  pool = GamePool()
  repo = Repository()

  player_1 = create_player("player-1", "1234")
  player_2 = create_player("player-2", "1234")
  game, _ = start_game([player_1, player_2], pool, repo)

  play_move("1234", player_1.id, game.id, repo)
  print("repo", repo._db)

  assert repo.get(game.id) != None