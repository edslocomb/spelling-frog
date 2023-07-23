class Puzzle < ApplicationRecord
  include Lettered

  has_many :puzzles_words
  has_many :words, through: :puzzles_words

  validates :letters, length: {is: 7}
  validates :required_letter, presence: true, length: {is: 1}
  validate :letters_inlude_required_letter, :words_fit_puzzle

  class << self
    def today
      Puzzle.order(:id).last
    end

    def import!(record, keymap = {letters: "letters", required_letter: "required_letter", words: "words"})
      required_letter = (record[keymap[:required_letter]] || record[keymap[:letters]].first)
      puzzle = new(letters: record[keymap[:letters]].chars.sort.join(""), required_letter: required_letter)
      puzzle.words = record[keymap[:words]].map { |w| Word.find_or_initialize_by(name: w) }
      puzzle.save!
    end
  end

  def letters=(value)
    self[:letters] = value&.split("")&.sort&.join("")
  end

  def score
    words.map(&:score).reduce(&:+)
  end

  private

  def letters_inlude_required_letter
    errors.add("letters must contain required_letter") unless letters&.include?(required_letter.to_s)
  end

  def words_fit_puzzle
    words.all? { |w| w.fits_puzzle(self) }
  end
end
