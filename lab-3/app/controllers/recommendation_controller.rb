# frozen_string_literal: true

class RecommendationController < ApplicationController
  before_action :authenticate_user!, :instructor?

  def index;
    @user = current_user
    get_students
    @pagy, @students = pagy(User.order(lname: :asc))
  end

  def get_students
    @students ||= query_students
  end

  def query_students
    return User.where(user_type: 'student').order(last_name: :asc) unless User.all.empty?
  end
end
