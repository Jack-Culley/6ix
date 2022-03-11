class Course < ApplicationRecord
    has_many :courses_users
    has_many :users, through: :courses_users
    has_many :sections
end
