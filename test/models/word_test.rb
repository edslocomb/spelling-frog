require "test_helper"

class WordTest < ActiveSupport::TestCase
  #
  # validations
  #

  test "assignment of name sets letters" do
    w = Word.new(name: "portrait")
    assert w.letters == "aioprt"
  end

  test "words must be 4 or more letters long" do
    w = Word.new(name: "cat")
    assert w.invalid?
  end

  test "words must be unique" do
    Word.create(name: "flotsam")
    w = Word.new(name: "flotsam")
    assert w.invalid?
  end

  # score

  test "4-letter word scores 1" do
    assert_equal Word.new(name: "puce").score, 1
  end

  test "5-letter word scores 5" do
    w = Word.new(name: "puppy")
    assert_equal w.score, 5
  end

  test "7-letter word with less than 7 different letters scores 7" do
    w = Word.new(name: "skitter")
    assert_equal w.score, 7
  end

  test "7-letter word with 7 different letters scores 14" do
    w = Word.new(name: "asterix")
    assert_equal w.score, 14
  end
end
