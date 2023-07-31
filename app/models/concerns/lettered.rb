module Lettered
  extend ActiveSupport::Concern

  included do
    validates :letters, presence: true, length: {maximum: 7}
    validate :letters_are_unique, :letters_are_sorted
  end

  class_methods do
    def extract_letters(string)
      string&.chars&.sort&.uniq&.join("")
    end
  end

  private

  def letters_are_unique
    unless letters&.split("")&.uniq&.join("") == letters
      errors.add("letters can't contain the same letter twice")
    end
  end

  def letters_are_sorted
    unless letters&.split("")&.sort&.join("") == letters
      errors.add("letters must be in alphabetical order")
    end
  end
end
