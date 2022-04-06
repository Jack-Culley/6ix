class CoursesTaken < ApplicationRecord
  has_one :user
  validates :grade, presence: true
  validates :course_number, presence: true
  validates :department, presence: true
end
