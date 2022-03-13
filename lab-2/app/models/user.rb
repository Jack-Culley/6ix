# frozen_string_literal: true

class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  has_one :availability
  has_many :courses_users
  has_many :courses, through: :courses_users
  has_many :sections
  USER_TYPES = %w[student administrator instructor].freeze
  validates :user_type, acceptance: { accept: USER_TYPES }
  validates :first_name, presence: true, length: { maximum: 50, too_long: 'First name too long, max: 50.' }
  validates :last_name, presence: true, length: { maximum: 50, too_long: 'Last name too long, max: 50.' }
end
