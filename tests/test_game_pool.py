from src.domain.entities import GamePool, create_game, create_player

def test_create_new_game_with_incomplete_players():
  player_1 = create_player("player-1", "1234")
  game = create_game([player_1])

  assert GamePool.pop() != None