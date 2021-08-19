import pytest

from domain.services import play_move, start_game
from domain.entities import Player, Game, Result, create_player
from domain.repository.game_pool import FakeGamePool as GamePool
from domain.repository.game import FakeRepository as Repository

def test_computer_result():
  res = Game.compute_result("1234", "1234")
  assert res == Result(4, 0)

  res = Game.compute_result("1437", "1234")
  assert res == Result(2, 1)

def test_play_game():
  player_1 = Player("player-1", "1234")
  player_2 = Player("player-2", "1234")
  game = Game("game-1", [player_1, player_2])

  res = game.play("1234", "player-1")
  assert res == Result(4, 0)

  res = game.play("1437", "player-2")
  assert res == Result(2, 1)

def test_start_game_service():
  pool = GamePool()
  repo = Repository()
  player_1 = create_player("player-1", "1234")
  game_1, is_started = start_game([player_1], pool, repo)
  assert is_started == False

  player_2 = create_player("player-2", "1234")
  game_2, is_started = start_game([player_1], pool, repo)
  assert is_started == True

def test_play_move_service():
  pool = GamePool()
  repo = Repository()
  player_1 = create_player("player-1", "1234")
  game_1, is_started = start_game([player_1], pool, repo)

  player_2 = create_player("player-2", "1234")
  game_2, is_started = start_game([player_2], pool, repo)

  res = play_move("1234", "player-2", game_2.id, repo)
  print("res", res)

  assert res == Result(4, 0)

def _test_play_in_an_outside_game_fails():
  pool = GamePool()
  repo = Repository()
  player_1 = create_player("player-1", "1234")
  game_1, is_started = start_game([player_1], pool, repo)

  player_2 = create_player("player-2", "1234")
  game_2, is_started = start_game([player_2], pool, repo)

  player_3 = create_player("player-3", "1234")

  pytest.fail("Hello")
  res = play_move("1234", player_3.id, game_2.id, repo)

def _test_add_player_in_full_game_fails():
  pool = GamePool()
  repo = Repository()
  player_1 = create_player("player-1", "1234")
  _, _ = start_game([player_1], pool, repo)

  player_2 = create_player("player-2", "1234")
  game_2, _ = start_game([player_2], pool, repo)

  player_3 = create_player("player-3", "1234")
  game_2.add_player(player_3)
