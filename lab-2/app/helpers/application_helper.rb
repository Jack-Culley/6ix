# frozen_string_literal: true

module ApplicationHelper
  include Pagy::Frontend

  def signed_in?
    current_user
  end
end
