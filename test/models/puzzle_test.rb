require "test_helper"

class PuzzleTest < ActiveSupport::TestCase
  class Validators < PuzzleTest
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
  end

  class Score < PuzzleTest
    test "fixture puzzle gadilmr has score 106" do
      p = Puzzle.find_by(letters: "adgilmr", required_letter: "g")
      assert_equal p.score, 106
    end
  end

  class Import < PuzzleTest
    setup do
      @baekmnt_json_string = '{"letters":"baekmnt","date":"1970-04-13","words":["abate","abatement","abet","abetment","ameba","amebae","baba","babe","babka","bake","banana","bane","bank","bantam","bate","battement","batten","beak","beam","bean","beat","beaten","been","beet","bent","beta","betake","betaken","embank","embankment","kebab","mamba"]}'
    end

    test "import puzzle from json" do
      record = JSON.parse(@baekmnt_json_string)
      Puzzle.import!(record)
      puzzle = Puzzle.find_by(letters: "abekmnt")
      assert_equal puzzle.required_letter, "b"
      assert_equal puzzle.words.map(&:to_s).sort, record["words"].sort
      assert_equal puzzle.published_at, Time.new(1970, 4, 13)
    end

    test "import doesn't create dupes" do
      record = JSON.parse(@baekmnt_json_string)
      Puzzle.import!(record)
      assert_equal 1, Puzzle.where(letters: "abekmnt", required_letter: "b").count
      Puzzle.import!(record)
      assert_equal 1, Puzzle.where(letters: "abekmnt", required_letter: "b").count
    end

    test "import puzzles from json, with keymap" do
      record = JSON.parse('{"l":"abekmnt","r":"b","w":["abate","abatement","abet","abetment","ameba","amebae","baba","babe","babka","bake","banana","bane","bank","bantam","bate","battement","batten","beak","beam","bean","beat","beaten","been","beet","bent","beta","betake","betaken","embank","embankment","kebab","mamba"]}')
      Puzzle.import!(record, {letters: "l", required_letter: "r", words: "w"})
      puzzle = Puzzle.find_by(letters: "abekmnt")
      assert_equal puzzle.required_letter, "b"
      assert_equal record["w"].sort, puzzle.words.map(&:name)&.sort

      assert_equal record["w"].sort, puzzle.possible_solutions.map(&:to_s).sort
    end
  end

  class PossibleSolutions < PuzzleTest
    test "find possible solutions using fixtures" do
      puzzle = Puzzle.find_by(letters: "adgilmr", required_letter: "g")
      assert_equal puzzle.words.map(&:to_s).sort, puzzle.possible_solutions.map(&:to_s).sort

      new_puzzle = Puzzle.new(letters: "adgilmr", required_letter: "d")
      expected = ["admiral", "algid", "amid", "arid", "armada", "diagram", "dial", "dill", "drag",
        "dram", "drama", "drill", "gild", "gird", "glad", "grad", "grid", "iliad", "laggard",
        "laid", "lard", "madam", "madrigal", "maid", "mallard", "midair", "midi", "mild",
        "radar", "radial", "radii", "raid", "ramada", "rigid"]
      assert_equal expected, new_puzzle.possible_solutions.map(&:to_s)&.sort
    end
  end

  class PublicationScopes < PuzzleTest
    setup do
      @published_puzzle = Puzzle.find_by(letters: "adgilmr", required_letter: "g")
      @published_puzzle.update!(published_at: 1.hour.ago)

      @scheduled_puzzle = Puzzle.new(letters: "adgilmr",
        required_letter: "d", published_at: 23.hours.from_now)
      @scheduled_puzzle.words = @scheduled_puzzle.possible_solutions
      @scheduled_puzzle.save!

      @draft_puzzle = Puzzle.create!(letters: "adgilmr", required_letter: "m", published_at: nil)
    end

    test "scopes based on publication date" do
      assert_equal [@published_puzzle], Puzzle.published.to_a
      assert_equal [@scheduled_puzzle], Puzzle.scheduled.to_a
      assert_equal [@draft_puzzle], Puzzle.draft.to_a
      assert_equal @published_puzzle, Puzzle.latest
    end
  end
end
