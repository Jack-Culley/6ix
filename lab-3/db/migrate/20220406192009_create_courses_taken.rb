class CreateCoursesTaken < ActiveRecord::Migration[6.1]
  def change
    create_table :courses_takens do |t|
      t.float :grade, null: false
      t.boolean :interest
      t.boolean :is_recommended
      t.boolean :is_requested
      t.integer :course_number, null: false
      t.string :department, null: false

      t.timestamps
    end
    add_reference :courses_takens, :user, foreign_key: true, index: true
  end
end
