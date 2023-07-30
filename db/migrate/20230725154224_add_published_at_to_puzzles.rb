class AddPublishedAtToPuzzles < ActiveRecord::Migration[7.0]
  def change
    add_column :puzzles, :published_at, :datetime
    add_index :puzzles, :published_at
  end
end
