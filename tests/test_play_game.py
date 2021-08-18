from src.domain.entities import Player, Game, Result

def test_computer_result():
  res = Game.compute_result("1234", "1234")
  assert res == Result(4, 0)

  res = Game.compute_result("1437", "1234")
  assert res == Result(2, 1)

def test_play_game():
  player_1 = Player("player-1", "1234")
  player_2 = Player("player-2", "1234")
  game = Game("game-1", [player_1, player_2])

  res = game.play("1234", 0)
  assert res == Result(4, 0)

  res = game.play("1437", 0)
  assert res == Result(2, 1)

if __name__ == "__main__":
  test_computer_result()
  test_play_game()