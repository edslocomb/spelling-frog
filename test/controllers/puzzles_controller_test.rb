require "test_helper"

class PuzzlesControllerTest < ActionDispatch::IntegrationTest
  test "index" do
    get puzzles_url
    assert_response :success
  end

  test "show by letters" do
    puzzle = puzzles(:gadilmr)
    get puzzle_url("gadilmr")
    assert_redirected_to puzzle_url(puzzle)
  end

  test "show nth previous puzzle by negative id" do
  end

  test "show latest puzzle by id=0" do
    get puzzle_url("0")
    assert_redirected_to puzzle_url(puzzles(:gadilmr))
  end
end
