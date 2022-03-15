# frozen_string_literal: true

class ApplicationController < ActionController::Base
  include Pagy::Backend
  protect_from_forgery with: :exception

  before_action :update_allowed_parameters, if: :devise_controller?

  private

  def osu_client
    @osu_client ||= Faraday.new(url: 'https://content.osu.edu/v2') do |f|
      f.request :json
      f.response :json
    end
  end

  def get_params(opts)
    params = {}
    opts.each do |key, value|
      params[key.to_sym] = value
    end

    params
  end

  protected

  def update_allowed_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: %i[first_name last_name user_type])
  end
end
