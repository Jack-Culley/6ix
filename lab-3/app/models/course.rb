# frozen_string_literal: true

class Course < ApplicationRecord
  has_many :courses_users
  has_many :users, through: :courses_users
  has_many :sections
  validates :department, presence: true
  validates :campus, presence: true
  validates :course_title, presence: true

  scope :for_term, ->(term) { where(term: term) }
  scope :for_course_number, ->(course_number) { where(course_number: course_number) }
  scope :for_level, ->(level) { where('course_number >= ? AND course_number < ?', level, level+1000)}
  scope :for_params_with_level, ->(params, level) { where(params).and(where('course_number >= ? AND course_number < ?', level, level+1000)) }
  scope :for_params, ->(params) { where(params) }

end
