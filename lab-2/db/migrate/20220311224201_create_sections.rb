# frozen_string_literal: true

class CreateSections < ActiveRecord::Migration[6.1]
  def change
    create_table :sections, id: false, primary_key: :section_number do |t|
      t.integer :section_number, null: false
      t.datetime :start_time, null: false
      t.datetime :end_time, null: false
      t.string :days_of_the_week, null: false
      t.integer :number_of_graders, null: false, default: 0

      t.timestamps
    end
    add_reference :sections, :instructor, foreign_key: { to_table: :users }, index: true
  end
end
