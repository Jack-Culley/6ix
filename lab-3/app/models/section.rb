# frozen_string_literal: true

class Section < ApplicationRecord
  self.primary_key = 'section_number'
  DAYS = {}.tap do |h|
    h['0'] = 'M'
    h['1'] = 'T'
    h['2'] = 'W'
    h['3'] = 'R'
    h['4'] = 'F'
    h['5'] = 'S'
    h['6'] = 'U'
  end
  has_one :user
  belongs_to :course

  scope :for_params, ->(params) { where(params) }
end
