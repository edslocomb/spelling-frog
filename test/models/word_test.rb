require "test_helper"

class WordTest < ActiveSupport::TestCase
  test "assignment of name sets letters" do
    w = Word.new(name: "portrait")
    assert w.letters == "aioprt"
  end

  test "can't assign letters directly" do
    w = Word.new(name: "portrait", letters: "salmon")
    assert w.letters == "aioprt"
    w.letters = "aio"
    assert w.letters == "aioprt"
  end

  test "words must be 4 or more letters long" do
    w = Word.new(name: "cat")
    assert w.invalid?
  end
end
