class Word < ApplicationRecord
  include Lettered

  has_many :puzzles, through: :puzzles_words

  validates :name, length: {minimum: 4}

  def name=(value)
    self[:name] = value
    self[:letters] = value&.split("")&.sort&.uniq&.join("")
  end

  def letters=(value)
    # set letters via name=()
  end
end
