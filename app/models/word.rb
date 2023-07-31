class Word < ApplicationRecord
  include Lettered

  has_many :puzzles_words
  has_many :puzzles, through: :puzzles_words

  validates :name, length: {minimum: 4}, uniqueness: true

  after_initialize { |w| w[:letters] = self.class.extract_letters(w.name) }
  before_save { |w| w[:letters] = self.class.extract_letters(w.name) }

  def name=(value)
    self[:letters] = self.class.extract_letters(value)
    self[:name] = value
  end

  def to_s
    name
  end

  def score
    return 1 if name.length < 5
    ret = name.length
    ret += 7 if letters.length > 6
    ret
  end

  def fits_puzzle(puzzle)
    chars = letters.chars
    (chars - puzzle.letters.chars).empty? && chars.include?(puzzle.required_letter)
  end
end
