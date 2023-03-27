class Word < ApplicationRecord
  include Lettered

  has_many :puzzles_words
  has_many :puzzles, through: :puzzles_words

  validates :name, length: {minimum: 4}, uniqueness: true

  after_initialize { |w| w[:letters] = extract_letters(w.name) }
  before_save { |w| w[:letters] = extract_letters(w.name) }

  # Allow shortcut syntax Word.new("frog")
  def initialize(value)
    attributes = value.is_a?(String) ? {name: value} : value
    super(attributes)
  end

  def name=(value)
    self[:name] = value
    self[:letters] = extract_letters(value)
  end

  def letters=(value)
    # set letters only via name=() or callbacks
  end

  def score
    return 1 if name.length < 5
    ret = name.length
    ret += 7 if letters.length > 6
    ret
  end
end
