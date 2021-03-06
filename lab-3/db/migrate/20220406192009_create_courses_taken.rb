# frozen_string_literal: true

class CreateCoursesTaken < ActiveRecord::Migration[6.1]
  def change
    create_table :courses_takens do |t|
      t.string :letter_grade, null: false
      t.boolean :interest
      t.boolean :is_recommended
      t.string :is_requested, default: ''
      t.integer :course_number, null: false
      t.string :department, null: false

      t.timestamps
    end
    add_reference :courses_takens, :user, foreign_key: true, index: true
  end
end
