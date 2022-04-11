# frozen_string_literal: true

class CoursesTaken < ApplicationRecord
  has_one :user
  validates :letter_grade, presence: true, format: { with: /\AA-*\z/ }
  validates :course_number, presence: true, uniqueness: { scope: %i[department user_id], full_messages: 'course already in the system' }
  validates :department, presence: true
end
