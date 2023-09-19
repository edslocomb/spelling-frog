require "application_system_test_case"

class PuzzlesSystemTest < ApplicationSystemTestCase
  test "solve a puzzle" do
    puzzle = puzzles(:gadilmr)
    # sanity check-- don't want to solve an empty puzzle
    assert_equal "adgilmr", puzzle.letters
    assert_equal 31, puzzle.words.count

    visit puzzle_url(puzzle)
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
    assert_selector("span", text: puzzle.required_letter.upcase, style: {color: "rgb(56, 142, 60)"})
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

  test "guessing words and getting notifications" do
    # add some nonsense words to the Word db (but not as solutions to Puzzle.first)
    Word.create(name: "gillam")
    Word.create(name: "gaddy") # 'y' is not in Puzzle.first.letters

    puzzle = puzzles(:gadilmr)
    visit puzzle_url(puzzle)

    send_keys "gillam"
    assert_text "GILLAM"
    # 'G' should render in green
    assert_selector("span", text: "G", style: {color: "rgb(56, 142, 60)"})
    # 'ILLAM' should render in default text color
    assert_selector("span", text: "G", style: {color: "rgba(0, 0, 0, 0.87)"})
    send_keys :return
    assert_text "Unknown Word"
    assert_no_text "Unknown Word" # notification expires
    assert_no_text "Gaddy"

    send_keys "gilly"
    assert_text "GILLY"
    # 'Y' should render in grey
    assert_selector("span", text: "Y", style: {color: "rgba(0, 0, 0, 0.38)"})
    send_keys :return
    assert_text "Extraneous Letter"
    assert_no_text "Extraneous Letter" # notification expires
    assert_no_text "Gilly"

    send_keys "madrigal"
    send_keys :return
    assert_text "Madrigal +15"
    assert_no_text "Madrigal +15" # notification expires

    send_keys "madrigal"
    send_keys :return
    assert_text "Already Found"
    assert_no_text "Already Found" # notification expires

    send_keys "llama"
    send_keys :return
    assert_text "Missing Center Letter"
    assert_no_text "Missing Center Letter" # notification expires

    send_keys "dig"
    send_keys :return
    assert_text "Too Short"
    assert_no_text "Too Short" # notification expires
  end

  test "progress preserved after navigating to other puzzles" do
    puzzle = puzzles(:gadilmr)
    old_puzzle = puzzles(:old)
    latest_puzzle = Puzzle.create(letters: "adgilmr", required_letter: "m", published_at: 1.hour.ago)
    yesterday_puzzle = Puzzle.create(letters: "adgilmr", required_letter: "l", published_at: 25.hours.ago)

    [old_puzzle, latest_puzzle, yesterday_puzzle].each do |p|
      p.words = p.possible_solutions
      p.save!
    end
    assert_equal latest_puzzle, Puzzle.latest

    visit puzzle_url(puzzle)
    assert_text puzzle.published_at.strftime("%-m/%-d/%Y")
    puzzle_word = "grad"

    send_keys puzzle_word
    send_keys :return
    assert_text puzzle_word.capitalize

    # navigate via browser urls
    visit puzzle_url(old_puzzle)
    assert_text old_puzzle.published_at.strftime("%-m/%-d/%Y")
    assert_no_text puzzle_word.capitalize

    old_word = "raid"
    send_keys old_word
    send_keys :return
    assert_text old_word.capitalize

    visit puzzle_url(puzzle)
    assert_text puzzle.published_at.strftime("%-m/%-d/%Y")
    assert_text puzzle_word.capitalize
    assert_no_text old_word.capitalize

    # navigate via front-end router links
    click_button "Open Main Menu"
    click_on "Previous Puzzle"
    assert_text old_puzzle.published_at.strftime("%-m/%-d/%Y")
    assert_text old_word.capitalize
    assert_no_text puzzle_word.capitalize

    click_button "Open Main Menu"
    click_on "Next Puzzle"
    assert_text puzzle.published_at.strftime("%-m/%-d/%Y")
    assert_text puzzle_word.capitalize
    assert_no_text old_word.capitalize

    click_button "Open Main Menu"
    click_on "Next Puzzle"
    assert_text yesterday_puzzle.published_at.strftime("%-m/%-d/%Y")
    assert_no_text puzzle_word.capitalize
    assert_no_text old_word.capitalize

    click_button "Open Main Menu"
    assert_no_text "Next Puzzle"
    click_on "Latest Puzzle"
    assert_text latest_puzzle.published_at.strftime("%-m/%-d/%Y")

    latest_word = "mall"
    send_keys latest_word
    send_keys :return
    assert_text latest_word.capitalize

    click_button "Open Main Menu"
    click_on "Previous Puzzle"
    click_button "Open Main Menu"
    click_on "Previous Puzzle"
    assert_text puzzle.published_at.strftime("%-m/%-d/%Y")
    assert_text puzzle_word.capitalize

    click_button "Open Main Menu"
    assert_text "Next Puzzle"
    click_on "Latest Puzzle"
    assert_text latest_puzzle.published_at.strftime("%-m/%-d/%Y")
    assert_text latest_word.capitalize
  end
end
