# frozen_string_literal: true

class Course < ApplicationRecord
  has_many :courses_users
  has_many :users, through: :courses_users
  has_many :sections
  validates :department, presence: true
  validates :campus, presence: true
  validates :course_title, presence: true

  scope :for_params_with_level, lambda { |params, level|
                                  where(params).and(where('course_number >= ? AND course_number < ?', level, level + 1000))
                                }
  scope :for_params, ->(params) { where(params) }

  validates :course_number, presence: true, format: {with: /\A\d{4}\z/, message: "invalid must be 4 digits 0-9"}
end
