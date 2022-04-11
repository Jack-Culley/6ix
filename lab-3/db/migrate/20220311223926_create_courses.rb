# frozen_string_literal: true

class CreateCourses < ActiveRecord::Migration[6.1]
  def change
    create_table :courses do |t|
      t.string :department, null: false, default: 'CSE'
      t.string :campus, null: false
      t.string :course_title, null: false
      t.integer :course_number, null: false

      t.timestamps
    end
  end
end
