require "application_system_test_case"

class PuzzlesTest < ApplicationSystemTestCase
  test "solve a puzzle" do
    puzzle = Puzzle.first
    # sanity check-- don't want to solve an empty puzzle
    assert_equal "adgilmr", puzzle.letters
    assert_equal 31, puzzle.words.count

    visit puzzles_url(id: puzzle.id)
    assert_text "Spelling Frog"

    # randomize word order for solve
    shuffled_words = puzzle.words.shuffle

    # click buttons to enter first word
    first_word = shuffled_words.first
    first_word.to_s.chars.each do |letter|
      click_button letter
    end
    # word is displayed as guess
    assert_text first_word.to_s.upcase
    assert_selector("span", text: puzzle.required_letter.upcase, style: {color: "rgb(139, 195, 74)"})
    click_button "enter"
    # score notification appears
    assert_text "#{first_word.to_s.capitalize} +#{first_word.score}"
    # score notification disappears
    assert_no_text "#{first_word.to_s.capitalize} +#{first_word.score}"
    # word is in found words list
    assert_text first_word.to_s.capitalize

    # enter remaining words via keyboard
    shuffled_words.slice(1..-1).each do |word|
      send_keys word.to_s
      assert_text word.to_s.upcase
      send_keys :return
      assert_text word.to_s.capitalize
    end

    # word using all letters is in bold in found word list
    assert_selector("span", text: "Madrigal")
    assert_selector("span", text: "Madrigal", style: {"font-weight": "700"})
    # word using only some letters is normal weight
    assert_selector("span", text: "Milligram", style: {"font-weight": "400"})

    assert_text puzzle.score
  end

  test "guess a word that's not a solution" do
    # add some nonsense words to the Word db (but not as solutions to Puzzle.first)
    Word.create("gillam")
    Word.create("gaddy") # 'y' is not in Puzzle.first.letters
    puzzle = Puzzle.first
    visit puzzles_url(id: puzzle.id)

    send_keys "gillam"
    assert_text "GILLAM"
    send_keys :return
    assert_no_text "Gaddy"

    send_keys "gilly"
    assert_text "GILLY"
    # 'Y' should render in grey
    assert_selector("span", text: "Y", style: {color: "rgba(0, 0, 0, 0.38)"})
    send_keys :return
    assert_no_text "Gilly"
  end
end
