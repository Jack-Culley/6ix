# frozen_string_literal: true

class CreateAvailabilities < ActiveRecord::Migration[6.1]
  def change
    create_table :availabilities do |t|
      t.text :availabiliy_json

      t.timestamps
    end
    add_reference :availabilities, :user, foreign_key: true, index: true
  end
end
