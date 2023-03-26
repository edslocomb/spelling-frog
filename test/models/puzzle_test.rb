require "test_helper"

class PuzzleTest < ActiveSupport::TestCase
  #
  # validators
  #

  test "has 7 letters" do
    p = Puzzle.new(letters: "wahorty", required_letter: "w")
    assert p.valid?
    p.letters = "wahort"
    assert p.invalid?
    p.letters = "wahortyp"
    assert p.invalid?
    p.letters = nil
    assert p.invalid?
  end

  test "valid required letter" do
    p = Puzzle.new(letters: "wahorty")
    assert p.invalid?
    p.required_letter = "w"
    assert p.valid?
    p.required_letter = "e"
    assert p.invalid?
    p.required_letter = "wa"
    assert p.invalid?
  end

  test "letters are unique" do
    p = Puzzle.new(letters: "wahortw", required_letter: "w")
    assert p.invalid?
  end
end
