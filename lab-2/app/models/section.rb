class Section < ApplicationRecord
    has_one :user
    has_one :course
end
