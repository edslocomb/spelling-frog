class Puzzle < ApplicationRecord
  include Lettered

  has_many :puzzles_words, dependent: :destroy
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

    def for_letters(letters)
      published.find_by(required_letter: letters.first,
        letters: letters.chars.sort.join)
    end

    def for(query)
      if query.match?(/^[a-z]{7}$/)
        for_letters(query)
      elsif query.match?(/^-?\d+$/)
        for_number(query.to_i)
      elsif query =~ /^(\d+)([-+]\d+)$/
        for_offset($1, $2)
      end
    end

    def for_number(num)
      if num > 0
        published.find_by(id: num)
      elsif num == 0
        latest
      else
        published.order(published_at: :desc).limit(-num + 1).last
      end
    end

    def for_offset(id, offset)
      dir = offset.first
      puzzle = find(id)
      range = ((dir == "-") ? ..puzzle.published_at : puzzle.published_at..)
      published
        .where(published_at: range)
        .order(published_at: (dir == "-") ? :desc : :asc)
        .limit(offset.slice(1..).to_i + 1)
        .last
    end

    def import!(record, keymap = {
      letters: "letters",
      required_letter: "required_letter",
      words: "words",
      date: "date"
    })
      required_letter = (record[keymap[:required_letter]] || record[keymap[:letters]].first)
      letters = record[keymap[:letters]].chars.sort.join("")
      return if Puzzle.find_by(required_letter: required_letter, letters: letters)

      existing_words = Word.where(name: record[keymap[:words]])
      new_word_names = record[keymap[:words]] - existing_words.map(&:name)

      Puzzle.transaction do
        new_word_ids = if new_word_names.empty?
          []
        else
          Word.insert_all!(new_word_names.map { |w| {name: w, letters: extract_letters(w)} })
            .pluck("id")
        end
        new_puzzle = Puzzle.create(
          letters: letters,
          required_letter: required_letter,
          published_at: record[keymap[:date]]
        )
        PuzzlesWord.insert_all!(
          (new_word_ids + existing_words.map(&:id))
            .map { |word_id| {word_id: word_id, puzzle_id: new_puzzle.id} }
        )
      end
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
