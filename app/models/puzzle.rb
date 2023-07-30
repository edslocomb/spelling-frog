class Puzzle < ApplicationRecord
  include Lettered

  has_many :puzzles_words
  has_many :words, through: :puzzles_words

  validates :letters, length: {is: 7}
  validates :required_letter, presence: true, length: {is: 1}
  validate :validate_letters_include_required_letter, :words_fit_puzzle

  class << self
    def draft
      where(published_at: nil)
    end

    def scheduled
      where.not(published_at: nil)
        .where(published_at: Time.now..)
    end

    def unpublished
      where(published_at: nil)
        .or.where(published_at: Time.now..)
    end

    def published
      where.not(published_at: nil)
        .where(published_at: ..Time.now)
    end

    def latest
      published.order(published_at: :desc).first
    end

    def import!(record, keymap = {
      letters: "letters",
      required_letter: "required_letter",
      words: "words",
      date: "date"
    })

      required_letter = (record[keymap[:required_letter]] || record[keymap[:letters]].first)
      puzzle = new(
        letters: record[keymap[:letters]].chars.sort.join(""),
        required_letter: required_letter,
        published_at: record[keymap[:date]]
      )
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

  def possible_solutions
    letters_a = letters.chars

    letter_combinations =
      (2..7).map { |word_length|
        letters_a
          .combination(word_length)
          .filter { |combo| contains_required_letter?(combo) }
          .filter { |combo| contains_vowel?(combo) }
          .map(&:sort)
          .map(&:join)
      }
        .flatten
    Word.where(letters: letter_combinations)
  end

  private

  def contains_vowel?(string)
    ["e", "a", "i", "o", "u", "y"].any? { |v| string&.include?(v) }
  end

  def contains_required_letter?(string)
    string&.include?(required_letter.to_s)
  end

  def validate_letters_include_required_letter
    errors.add("letters must contain required_letter") unless contains_required_letter?(letters)
  end

  def words_fit_puzzle
    words.all? { |w| w.fits_puzzle(self) }
  end
end
