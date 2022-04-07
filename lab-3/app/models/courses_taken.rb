# frozen_string_literal: true

class CoursesTaken < ApplicationRecord
  has_one :user
  validates :letter_grade, presence: true, format: { with: /\AA-*\z/ }
  validates :course_number, presence: true
  validates :department, presence: true
end
