module Lettered
  extend ActiveSupport::Concern

  included do
    validates :letters, presence: true
    validate :letters_are_unique, :letters_are_sorted
  end

  private

  def letters_are_unique
    errors.add("letters can't contain the same letter twice") unless letters&.split('')&.uniq&.join('') == letters
  end

  def letters_are_sorted
    errors.add("letters must be in alphabetical order") unless letters&.split('')&.sort&.join('') == letters
  end
end
