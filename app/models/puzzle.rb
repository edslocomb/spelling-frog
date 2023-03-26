class Puzzle < ApplicationRecord
  validates :letters, presence: true, length: { is: 7 }
  validates :required_letter, presence: true, length: { is: 1 }
  validate :letters_inlude_required_letter, :letters_are_unique

  private

  def letters_inlude_required_letter
    errors.add('letters must contain required_letter') unless letters&.include?(required_letter.to_s)
  end

  def letters_are_unique
    errors.add("letters can't contain the same letter twice") unless letters&.split('')&.uniq&.join('') == letters
  end
end
