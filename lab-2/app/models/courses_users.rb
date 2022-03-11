# frozen_string_literal: true

class CoursesUsers < ApplicationRecord
    belongs_to :users
    belongs_to :courses
end
