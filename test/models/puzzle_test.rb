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
    p = Puzzle.new(letters: "gahortg", required_letter: "g")
    assert p.invalid?
  end

  test "letters are sorted" do
    p = Puzzle.new(letters: "wahorty", required_letter: "w")
    assert p.valid?
    p[:letters] = "wahorty" # bypass custom letters=() setter
    assert p.invalid?
  end

  # score

  test "fixture puzzle gadilmr has score 106" do
    p = Puzzle.find_by(letters: "adgilmr", required_letter: "g")
    assert_equal p.score, 106
  end

  # import

  test "import puzzles from json" do
    fixture_word_count = Word.count
    record = JSON.parse('{"letters":"baekmnt","words":["abate","abatement","abet","abetment","ameba","amebae","baba","babe","babka","bake","banana","bane","bank","bantam","bate","battement","batten","beak","beam","bean","beat","beaten","been","beet","bent","beta","betake","betaken","embank","embankment","kebab","mamba"]}')
    Puzzle.import!(record)
    assert Word.count == fixture_word_count + record["words"].length
  end

  test "import puzzles from json, with keymap" do
    fixture_word_count = Word.count
    record = JSON.parse('{"l":"abekmnt","r":"b","w":["abate","abatement","abet","abetment","ameba","amebae","baba","babe","babka","bake","banana","bane","bank","bantam","bate","battement","batten","beak","beam","bean","beat","beaten","been","beet","bent","beta","betake","betaken","embank","embankment","kebab","mamba"]}')
    Puzzle.import!(record, {letters: "l", required_letter: "r", words: "w"})
    assert Word.count == fixture_word_count + record["w"].length
  end
end
