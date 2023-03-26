class CreateWords < ActiveRecord::Migration[7.0]
  def change
    create_table :words do |t|
      t.string :letters
      t.string :name

      t.timestamps
    end
    add_index :words, :letters
  end
end
