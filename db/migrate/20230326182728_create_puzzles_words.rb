class CreatePuzzlesWords < ActiveRecord::Migration[7.0]
  def change
    create_table :puzzles_words do |t|
      t.references :puzzle, null: false, foreign_key: true
      t.references :word, null: false, foreign_key: true

      t.timestamps
    end
  end
end
