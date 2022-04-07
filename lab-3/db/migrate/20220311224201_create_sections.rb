# frozen_string_literal: true

class CreateSections < ActiveRecord::Migration[6.1]
  def change
    create_table :sections, id: false, primary_key: :section_number do |t|
      t.integer :section_number
      t.datetime :start_time
      t.datetime :end_time
      t.boolean :days_of_the_week, array: true, default: []
      t.integer :number_of_graders, null: false, default: 0
      t.integer :grader_ids, array: true, default: []

      t.timestamps
    end
    add_reference :sections, :instructor, foreign_key: { to_table: :users }, index: true
    add_reference :sections, :course, foreign_key: { to_table: :courses }, index: true
  end
end
