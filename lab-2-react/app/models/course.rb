# frozen_string_literal: true

class Course < ApplicationRecord
  has_many :courses_users
  has_many :users, through: :courses_users
  has_many :sections
  validates :department, presence: true
  validates :campus, presence: true
  validates :course_title, presence: true
end
