# frozen_string_literal: true

class ProfileController < ApplicationController
  def index
    @first = current_user.first_name
    @last = current_user.last_name
    @email = current_user.email
    @type = current_user.user_type
  end

end
