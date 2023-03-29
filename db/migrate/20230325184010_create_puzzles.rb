# frozen_string_literal: true

class CreatePuzzles < ActiveRecord::Migration[7.0]
  def change
    create_table :puzzles do |t|
      t.string :letters, limit: 7
      t.string :required_letter, limit: 1

      t.timestamps
    end
  end
end
