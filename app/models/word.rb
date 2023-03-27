class Word < ApplicationRecord
  include Lettered

  has_many :puzzles, through: :puzzles_words

  validates :name, length: {minimum: 4}

  def initialize(value)
    attributes = value.is_a?(String) ? {name: value} : value
    super(attributes)
  end

  def name=(value)
    self[:name] = value
    self[:letters] = value&.split("")&.sort&.uniq&.join("")
  end

  def letters=(value)
    # set letters via name=()
  end

  def score
    return 1 if name.length < 5
    ret = name.length
    ret += 7 if letters.length > 6
    ret
  end
end
