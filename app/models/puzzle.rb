class Puzzle < ApplicationRecord
  include Lettered

  has_many :words, through: :puzzles_words

  validates :letters, length: { is: 7 }
  validates :required_letter, presence: true, length: { is: 1 }
  validate :letters_inlude_required_letter

  def letters=(value)
    self[:letters] = value&.split('')&.sort&.join('')
  end

  private

  def letters_inlude_required_letter
    errors.add('letters must contain required_letter') unless letters&.include?(required_letter.to_s)
  end
end
