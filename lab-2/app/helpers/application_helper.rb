# frozen_string_literal: true

module ApplicationHelper
  include Pagy::Frontend

  def signed_in?
    current_user
  end

  def admin?
    return true if current_user&.user_type == 'administrator'

    false
  end
end
