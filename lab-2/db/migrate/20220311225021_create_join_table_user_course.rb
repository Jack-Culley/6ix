# frozen_string_literal: true

class CreateJoinTableUserCourse < ActiveRecord::Migration[6.1]
  def change
    create_join_table :users, :courses do |t|
      t.index %i[user_id course_id]
      t.index %i[course_id user_id]
      t.decimal :grade, null: false
      t.boolean :interest
    end
  end
end
