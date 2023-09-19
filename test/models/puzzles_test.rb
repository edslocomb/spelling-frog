require "test_helper"

class PuzzlesTest < ActiveSupport::TestCase
  test "finding puzzle by offset" do
    latest_puzzle = Puzzle.create(letters: "abcdefg", required_letter: "a", published_at: 1.hour.ago)
    assert_equal puzzles(:old), Puzzle.for("#{latest_puzzle.id}-2")
    assert_equal latest_puzzle, Puzzle.for("#{puzzles(:old).id}+2")
    assert_equal puzzles(:gadilmr), Puzzle.for("#{latest_puzzle.id}-1")
    assert_equal latest_puzzle, Puzzle.for("#{puzzles(:gadilmr).id}+1")
    assert_equal latest_puzzle, Puzzle.for("#{latest_puzzle.id}-0")
    assert_equal latest_puzzle, Puzzle.for("#{latest_puzzle.id}+0")
    assert_equal latest_puzzle, Puzzle.for("#{latest_puzzle.id}+1")
    assert_equal latest_puzzle, Puzzle.for("#{latest_puzzle.id}+2")
  end
end
