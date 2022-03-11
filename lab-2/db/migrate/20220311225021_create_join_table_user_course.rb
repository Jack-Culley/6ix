class CreateJoinTableUserCourse < ActiveRecord::Migration[6.1]
  def change
    create_join_table :users, :courses do |t|
      t.index [:user_id, :course_id]
      t.index [:course_id, :user_id]
      t.decimal :grade, null: false
      t.boolean :interest
    end
  end
end
