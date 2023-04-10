require "application_system_test_case"

class PuzzlesTest < ApplicationSystemTestCase
  test "solve a puzzle" do
    puzzle = Puzzle.first
    # sanity check-- don't want to solve an empty puzzle
    assert_equal "adgilmr", puzzle.letters
    assert_equal 31, puzzle.words.count

    visit puzzles_url(id: puzzle.id)
    assert_text "Spelling Frog"

    # guess a word wrong
    send_keys "mrdad"
    send_keys :return
    assert_no_text "mrdad"

    # click buttons to enter first word
    puzzle.words[0].to_s.chars.each do |letter|
      click_button letter
    end
    click_button "enter"
    assert_text puzzle.words.first.to_s.capitalize

    # enter remaining words via keyboard
    puzzle.words.slice(1..-1).each do |word|
      send_keys word.to_s
      send_keys :return
      assert_text word.to_s.capitalize
    end

    assert_text puzzle.score
  end
end
